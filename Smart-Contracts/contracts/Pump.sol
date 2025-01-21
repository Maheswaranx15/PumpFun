// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PumpFun is ReentrancyGuard, Ownable {
    struct PumpEvent {
        address token;
        uint256 startTime;
        uint256 endTime;
        uint256 totalContributed;
        uint256 targetPrice;
        bool completed;
        mapping(address => uint256) contributions;
    }

    mapping(uint256 => PumpEvent) public pumpEvents;
    uint256 public eventCount;
    address public feeRecipient;
    uint256 public platformFee; // Fee percentage in basis points (e.g., 100 = 1%)

    event PumpEventCreated(
        uint256 eventId,
        address token,
        uint256 startTime,
        uint256 endTime,
        uint256 targetPrice
    );

    event ContributionMade(
        uint256 eventId,
        address contributor,
        uint256 amount
    );

    event PumpEventCompleted(uint256 eventId);

    event RewardsClaimed(uint256 eventId, address contributor, uint256 reward);

    modifier eventExists(uint256 eventId) {
        require(eventId < eventCount, "Pump event does not exist");
        _;
    }

    constructor(address _feeRecipient, uint256 _platformFee) Ownable(msg.sender) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        require(_platformFee <= 1000, "Fee too high");
        feeRecipient = _feeRecipient;
        platformFee = _platformFee;
    }

    function createPumpEvent(
        address _token,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _targetPrice
    ) external onlyOwner returns (uint256) {
        require(_startTime >= block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");

        PumpEvent storage newEvent = pumpEvents[eventCount];
        newEvent.token = _token;
        newEvent.startTime = _startTime;
        newEvent.endTime = _endTime;
        newEvent.targetPrice = _targetPrice;

        emit PumpEventCreated(eventCount, _token, _startTime, _endTime, _targetPrice);

        return eventCount++;
    }

    function contribute(uint256 eventId, uint256 amount) 
        external 
        nonReentrant 
        eventExists(eventId) 
    {
        PumpEvent storage pumpEvent = pumpEvents[eventId];
        require(block.timestamp >= pumpEvent.startTime, "Pump event has not started");
        require(block.timestamp <= pumpEvent.endTime, "Pump event has ended");
        require(!pumpEvent.completed, "Pump event already completed");

        IERC20 token = IERC20(pumpEvent.token);
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        uint256 fee = (amount * platformFee) / 10000;
        uint256 contribution = amount - fee;

        require(token.transfer(feeRecipient, fee), "Fee transfer failed");

        pumpEvent.contributions[msg.sender] += contribution;
        pumpEvent.totalContributed += contribution;

        emit ContributionMade(eventId, msg.sender, contribution);
    }

    function completePumpEvent(uint256 eventId) 
        external 
        onlyOwner 
        eventExists(eventId) 
    {
        PumpEvent storage pumpEvent = pumpEvents[eventId];
        require(block.timestamp > pumpEvent.endTime, "Pump event not yet ended");
        require(!pumpEvent.completed, "Pump event already completed");

        pumpEvent.completed = true;
        emit PumpEventCompleted(eventId);
    }

    function claimRewards(uint256 eventId) 
        external 
        nonReentrant 
        eventExists(eventId) 
    {
        PumpEvent storage pumpEvent = pumpEvents[eventId];
        require(pumpEvent.completed, "Pump event not completed yet");

        uint256 userContribution = pumpEvent.contributions[msg.sender];
        require(userContribution > 0, "No contributions made by user");

        uint256 reward = (userContribution * pumpEvent.totalContributed) / pumpEvent.totalContributed;
        pumpEvent.contributions[msg.sender] = 0;

        IERC20 token = IERC20(pumpEvent.token);
        require(token.transfer(msg.sender, reward), "Reward transfer failed");

        emit RewardsClaimed(eventId, msg.sender, reward);
    }

    function updateFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRecipient = _feeRecipient;
    }

    function updatePlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 1000, "Fee too high");
        platformFee = _platformFee;
    }
}
