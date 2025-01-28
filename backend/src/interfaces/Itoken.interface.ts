export interface IToken extends Document {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    tokenAddress: string;
    creatorAddress: string;
    fundingRaised: number;
}

export interface CreateTokenRequest {
    name: string;
    symbol: string;
    imageUrl: string;
    description: string;
    creatorAddress: string;
    fee: number;
  }
  
export interface BuyTokenRequest {
    tokenAddress: string;
    quantity: number;
    ethValue: string;
}
  
export interface CalculateCostRequest {
    currentSupply: number;
    tokensToBuy: number;
}