import { Request, Response } from "express";
import Token from "../models/token.model";
import { createToken, buyToken, calculateCost, getAllTokensFromContract } from "../services/contract.service";
import { StatusCode } from "../interfaces/enum/statuscode";
import { errorMessages } from "../utils/commonMessages";
import {CreateTokenRequest ,BuyTokenRequest,CalculateCostRequest } from '../interfaces/Itoken.interface';

export const createTokenHandler = async (
    req: Request<{}, {}, CreateTokenRequest>,
    res: Response
  ) => {
    const { name, symbol, imageUrl, description, creatorAddress, fee } = req.body;
  
    try {
      const receipt = await createToken(name, symbol, imageUrl, description, creatorAddress, fee.toString());
  
      const newToken = await Token.create({
        name,
        symbol,
        description,
        imageUrl,
        tokenAddress: receipt.to,
        creatorAddress,
      });
  
      res.status(StatusCode.Created).json({ message: "Token created successfully", data: newToken });
    } catch (error) {
      res.status(StatusCode.InternalServerError).json({ message: errorMessages.UNEXPECTED_ERROR });
    }
  };
  
  export const buyTokenHandler = async (
    req: Request<{}, {}, BuyTokenRequest>,
    res: Response
  ) => {
    const { tokenAddress, quantity, ethValue } = req.body;
  
    try {
      const receipt = await buyToken(tokenAddress, quantity, ethValue);
  
      const updatedToken = await Token.findOneAndUpdate(
        { tokenAddress },
        { $inc: { fundingRaised: Number(ethValue) } },
        { new: true }
      );
  
      res.status(StatusCode.OK).json({ message: "Token purchased successfully", data: updatedToken });
    } catch (error) {
      res.status(StatusCode.InternalServerError).json({ message: errorMessages.UNEXPECTED_ERROR });
    }
  };
  
  export const calculateCostHandler = async (
    req: Request<{}, {}, CalculateCostRequest>,
    res: Response
  ) => {
    const { currentSupply, tokensToBuy } = req.body;
    try {
      const cost = await calculateCost(currentSupply, tokensToBuy);
      res.status(StatusCode.Created).json({ cost });
    } catch (error) {
      res.status(StatusCode.InternalServerError).json({ message: errorMessages.UNEXPECTED_ERROR });
    }
  };

  const bigIntReplacer = (key: string, value: any) => {
    if (typeof value === 'bigint') {
      return value.toString();  // Convert BigInt to string
    }
    return value;
  };
  
  export const getAllTokensHandler = async (req: Request, res: Response) => {
    try {
      const tokens = await getAllTokensFromContract();
      console.log("tokens", tokens);
  
      
      const jsonResponse = JSON.stringify({ message: "Tokens fetched successfully", data: tokens }, bigIntReplacer);
  
      res.status(StatusCode.OK).json(JSON.parse(jsonResponse)); 
    } catch (error) {
      console.error("Error fetching tokens:", error); 
      res.status(StatusCode.InternalServerError).json({
        message: errorMessages.UNEXPECTED_ERROR,
        error: error,  
      });
    }
  };
  
