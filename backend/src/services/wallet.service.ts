import { verifySignature } from '../utils/verifySignature';
import userModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCode } from '../interfaces/enum/statuscode';
import { errorMessages, successMessages } from '../utils/commonMessages';
import { Document } from 'mongoose';

export const walletAuthService = {
  walletAuthentication: async (
    walletAddress: string,
    signature: string | undefined,
    secretMessage: string | undefined
  ) => {
    if (!walletAddress) {
      throw new ErrorHandler(errorMessages.INVALID_PARAMETER, StatusCode.BadRequest);
    }
    const user: (IUser & Document) | null = await userModel.findOne({ walletAddress });
    if (user) {
      if (!signature || !secretMessage) {
        throw new ErrorHandler(errorMessages.INVALID_PARAMETER, StatusCode.BadRequest);
      }
      const isVerified = verifySignature(signature, secretMessage, walletAddress);
      if (!isVerified) {
        throw new ErrorHandler(errorMessages.INVALID_SIGNATURE, StatusCode.BadRequest);
      }
      user.signature = signature;
      user.seceretMessage = secretMessage; 
      await user.save();

      return { message: successMessages.LOGIN_SUCCESS,user };
    }

    if (!signature || !secretMessage) {
      throw new ErrorHandler(errorMessages.INVALID_PARAMETER, StatusCode.BadRequest);
    }

    const newUser = await userModel.create({
      walletAddress,
      secretMessage,
      signature,
    });

    return {
      newUser,
    };
  },
};
