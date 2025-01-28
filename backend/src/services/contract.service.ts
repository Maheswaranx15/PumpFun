import { ethers } from "ethers";
import dotenv from "dotenv";
import {Pump_contract_abi} from '../utils/configs/Pumpcontract_abi'

dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

const provider = new ethers.JsonRpcProvider(`https://eth-holesky.g.alchemy.com/v2/hNyOSypSu6_BNJRACSUWdhKn6YhGeuZ3`);
const wallet = new ethers.Wallet(PRIVATE_KEY!, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS!, Pump_contract_abi!, wallet);

export const createToken = async (
  name: string,
  symbol: string,
  imageUrl: string,
  description: string,
  creatorAddress: string,
  fee: string
) => {
  const tx = await contract.createToken(name, symbol, imageUrl, description, {
    value: ethers.parseEther(fee),
  });
  const receipt = await tx.wait();
  return receipt;
};

export const buyToken = async (
  tokenAddress: string,
  quantity: number,
  ethValue: string
) => {
  const tx = await contract.buyToken(tokenAddress, quantity, {
    value: ethers.parseEther(ethValue),
  });
  const receipt = await tx.wait();
  return receipt;
};

export const calculateCost = async (currentSupply: number, tokensToBuy: number) => {
  const cost = await contract.calculateCost(currentSupply, tokensToBuy);
  return cost.toString();
};

export const getAllTokensFromContract = async () => {
  try {
    const tokens = await contract.getAllTokens();
    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw new Error("Unable to fetch tokens from contract");
  }
};

