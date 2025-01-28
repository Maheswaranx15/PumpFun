// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./mocks/MockERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";

contract PumpFunClone is ReentrancyGuard, Ownable {
    struct PumpToken {
        string name;
        string symbol;
        string description;
        string tokenImageUrl;
        uint256 fundingRaised;
        address tokenAddress;
        address creatorAddress;
    }

    address[] public PumpTokenAddresses;
    mapping(address => PumpToken) public addressToPumpTokenMapping;
    uint constant PUMPTOKEN_CREATION_PLATFORM_FEE = 0.0001 ether;
    uint constant PUMPCOIN_FUNDING_DEADLINE_DURATION = 3 days;
    uint constant PUMPCOIN_FUNDING_GOAL = 24 ether;
    

    address constant UNISWAP_V2_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address constant UNISWAP_V2_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    
    uint constant DECIMALS = 10 ** 18;
    uint constant MAX_SUPPLY = 1000000 * DECIMALS;
    uint constant INIT_SUPPLY = 20 * MAX_SUPPLY / 100;

    uint256 public  INITIAL_PRICE = 30000000000000;
    uint256 public constant K = 8 * 10**15;

    event TokenCreated(address indexed creator, address tokenAddress, string name, string symbol);
    event TokenPurchased(address indexed buyer, address tokenAddress, uint256 amount, uint256 ethSpent);
    event LiquidityPoolCreated(address indexed tokenAddress, address poolAddress);
    event LiquidityProvided(address indexed tokenAddress, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    event LPBurned(address indexed poolAddress, uint256 liquidity);
    constructor() Ownable(msg.sender) {
    }

    function createToken(
        string memory name,
        string memory symbol,
        string memory imageUrl,
        string memory description
    ) public payable nonReentrant returns (address) {
        require(msg.value>= PUMPTOKEN_CREATION_PLATFORM_FEE, "fee not paid for token creation");
        Token ct = new Token(name, symbol,msg.sender,INIT_SUPPLY);
        address tokenAddress = address(ct);
        PumpToken memory newlyCreatedToken = PumpToken(name, symbol, description, imageUrl, 0, tokenAddress, msg.sender);
        PumpTokenAddresses.push(tokenAddress);
        addressToPumpTokenMapping[tokenAddress] = newlyCreatedToken;
        emit TokenCreated(msg.sender, tokenAddress, name, symbol);
        return tokenAddress;
    }

        function buyToken(address tokenAddress, uint tokenQty) public payable nonReentrant returns(bool) {

        require(addressToPumpTokenMapping[tokenAddress].tokenAddress!=address(0), "Token is not listed");
        
        PumpToken storage listedToken = addressToPumpTokenMapping[tokenAddress];


        Token tokenCt = Token(tokenAddress);

        // check to ensure funding goal is not met
        require(listedToken.fundingRaised <= PUMPCOIN_FUNDING_GOAL, "Funding has already been raised");


        // check to ensure there is enough supply to facilitate the purchase
        uint currentSupply = tokenCt.totalSupply();
        console.log("Current supply", currentSupply);
        console.log("Max supply", MAX_SUPPLY);
        uint available_qty = MAX_SUPPLY - currentSupply;
        console.log("Qty available for purchase ",available_qty);


        uint scaled_available_qty = available_qty / DECIMALS;
        uint tokenQty_scaled = tokenQty * DECIMALS;

        require(tokenQty <= scaled_available_qty, "Not enough available supply");

        // calculate the cost for purchasing tokenQty tokens as per the exponential bonding curve formula
        uint currentSupplyScaled = (currentSupply - INIT_SUPPLY) / DECIMALS;
        uint requiredEth = calculateCost(currentSupplyScaled, tokenQty);

        console.log("ETH required for purchasing  tokens is ",requiredEth);

        // check if user has sent correct value of eth to facilitate this purchase
        require(msg.value >= requiredEth, "Incorrect value of ETH sent");

        // Incerement the funding
        listedToken.fundingRaised+= msg.value;

        if(listedToken.fundingRaised >= PUMPCOIN_FUNDING_GOAL){
            // create liquidity pool
            address pool = _createLiquidityPool(tokenAddress);
            emit LiquidityPoolCreated(tokenAddress, pool);

            // provide liquidity
            uint tokenAmount = INIT_SUPPLY;
            uint ethAmount = listedToken.fundingRaised;
            uint liquidity = _provideLiquidity(tokenAddress, tokenAmount, ethAmount);
            emit LiquidityProvided(tokenAddress, tokenAmount, ethAmount, liquidity);
            // burn lp token
            _burnLpTokens(pool, liquidity);

        }

        // mint the tokens
        tokenCt.mint(msg.sender,tokenQty_scaled);
        console.log("User balance of the tokens is ", tokenCt.balanceOf(msg.sender));

        console.log("New available qty ", MAX_SUPPLY - tokenCt.totalSupply());
        emit TokenPurchased(msg.sender, tokenAddress, tokenQty, msg.value);
        return true;
    }

        // Function to calculate the cost in wei for purchasing `tokensToBuy` starting from `currentSupply`
    function calculateCost(uint256 currentSupply, uint256 tokensToBuy) public view returns (uint256) {
        
        // Calculate the exponent parts scaled to avoid precision loss
        uint256 exponent1 = (K * (currentSupply + tokensToBuy)) / 10**18;
        uint256 exponent2 = (K * currentSupply) / 10**18;

        // Calculate e^(kx) using the exp function
        uint256 exp1 = exp(exponent1);
        uint256 exp2 = exp(exponent2);

        // Cost formula: (P0 / k) * (e^(k * (currentSupply + tokensToBuy)) - e^(k * currentSupply))
        // We use (P0 * 10^18) / k to keep the division safe from zero
        uint256 cost = (INITIAL_PRICE * 10**18 * (exp1 - exp2)) / K;  // Adjust for k scaling without dividing by zero
        return cost;
    }

     // Improved helper function to calculate e^x for larger x using a Taylor series approximation
    function exp(uint256 x) internal pure returns (uint256) {
        uint256 sum = 10**18;  // Start with 1 * 10^18 for precision
        uint256 term = 10**18;  // Initial term = 1 * 10^18
        uint256 xPower = x;  // Initial power of x
        
        for (uint256 i = 1; i <= 20; i++) {  // Increase iterations for better accuracy
            term = (term * xPower) / (i * 10**18);  // x^i / i!
            sum += term;

            // Prevent overflow and unnecessary calculations
            if (term < 1) break;
        }

        return sum;
    }

    function _burnLpTokens(address pool, uint liquidity) internal returns(bool){
        IUniswapV2Pair uniswapv2pairct = IUniswapV2Pair(pool);
        uniswapv2pairct.transfer(address(0), liquidity);
        emit LPBurned(pool, liquidity);
        return true;
    }

    function _createLiquidityPool(address tokenAddress) internal returns(address) {
        IUniswapV2Factory factory = IUniswapV2Factory(UNISWAP_V2_FACTORY_ADDRESS);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        address pair = factory.createPair(tokenAddress, router.WETH());
        return pair;
    }

    function _provideLiquidity(
        address tokenAddress,
        uint256 tokenAmount,
        uint256 ethAmount
    ) internal returns (uint256) {
        Token tokenCt = Token(tokenAddress);
        tokenCt.approve(UNISWAP_V2_ROUTER_ADDRESS, tokenAmount);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        (uint256 amountToken, uint256 amountETH, uint256 liquidity) = router.addLiquidityETH{
            value: ethAmount
        }(tokenAddress, tokenAmount, tokenAmount, ethAmount, address(this), block.timestamp);
        return liquidity;
    }

    function getAllTokens() public view returns (PumpToken[] memory) {
        PumpToken[] memory allTokens = new PumpToken[](PumpTokenAddresses.length);
        for (uint i = 0; i < PumpTokenAddresses.length; i++) {
            allTokens[i] = addressToPumpTokenMapping[PumpTokenAddresses[i]];
        }
        return allTokens;
    }

   
}
