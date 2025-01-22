export const abi =  [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
	  inputs: [{ internalType: "address", name: "owner", type: "address" }],
	  name: "OwnableInvalidOwner",
	  type: "error",
	},
	{
	  inputs: [{ internalType: "address", name: "account", type: "address" }],
	  name: "OwnableUnauthorizedAccount",
	  type: "error",
	},
	{ inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "poolAddress",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "liquidity",
		  type: "uint256",
		},
	  ],
	  name: "LPBurned",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "tokenAddress",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "poolAddress",
		  type: "address",
		},
	  ],
	  name: "LiquidityPoolCreated",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "tokenAddress",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "tokenAmount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "ethAmount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "liquidity",
		  type: "uint256",
		},
	  ],
	  name: "LiquidityProvided",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "previousOwner",
		  type: "address",
		},
		{
		  indexed: true,
		  internalType: "address",
		  name: "newOwner",
		  type: "address",
		},
	  ],
	  name: "OwnershipTransferred",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "creator",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "tokenAddress",
		  type: "address",
		},
		{ indexed: false, internalType: "string", name: "name", type: "string" },
		{
		  indexed: false,
		  internalType: "string",
		  name: "symbol",
		  type: "string",
		},
	  ],
	  name: "TokenCreated",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "buyer",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "address",
		  name: "tokenAddress",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "ethSpent",
		  type: "uint256",
		},
	  ],
	  name: "TokenPurchased",
	  type: "event",
	},
	{
	  inputs: [],
	  name: "INITIAL_PRICE",
	  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "K",
	  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
	  name: "PumpTokenAddresses",
	  outputs: [{ internalType: "address", name: "", type: "address" }],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [{ internalType: "address", name: "", type: "address" }],
	  name: "addressToPumpTokenMapping",
	  outputs: [
		{ internalType: "string", name: "name", type: "string" },
		{ internalType: "string", name: "symbol", type: "string" },
		{ internalType: "string", name: "description", type: "string" },
		{ internalType: "string", name: "tokenImageUrl", type: "string" },
		{ internalType: "uint256", name: "fundingRaised", type: "uint256" },
		{ internalType: "address", name: "tokenAddress", type: "address" },
		{ internalType: "address", name: "creatorAddress", type: "address" },
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{ internalType: "address", name: "tokenAddress", type: "address" },
		{ internalType: "uint256", name: "tokenQty", type: "uint256" },
	  ],
	  name: "buyToken",
	  outputs: [{ internalType: "bool", name: "", type: "bool" }],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [
		{ internalType: "uint256", name: "currentSupply", type: "uint256" },
		{ internalType: "uint256", name: "tokensToBuy", type: "uint256" },
	  ],
	  name: "calculateCost",
	  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{ internalType: "string", name: "name", type: "string" },
		{ internalType: "string", name: "symbol", type: "string" },
		{ internalType: "string", name: "imageUrl", type: "string" },
		{ internalType: "string", name: "description", type: "string" },
	  ],
	  name: "createToken",
	  outputs: [{ internalType: "address", name: "", type: "address" }],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getAllTokens",
	  outputs: [
		{
		  components: [
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "symbol", type: "string" },
			{ internalType: "string", name: "description", type: "string" },
			{ internalType: "string", name: "tokenImageUrl", type: "string" },
			{ internalType: "uint256", name: "fundingRaised", type: "uint256" },
			{ internalType: "address", name: "tokenAddress", type: "address" },
			{ internalType: "address", name: "creatorAddress", type: "address" },
		  ],
		  internalType: "struct PumpFunClone.PumpToken[]",
		  name: "",
		  type: "tuple[]",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "owner",
	  outputs: [{ internalType: "address", name: "", type: "address" }],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "renounceOwnership",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
	  name: "transferOwnership",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
  ];
  