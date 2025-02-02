import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../interfaces/enum/statuscode";
import ErrorHandler from "../utils/ErrorHandler";
import { errorMessages } from "../utils/commonMessages";
import { CatchAsyncError } from "../utils/catchAsyncError";
import { walletAuthService } from "../services/wallet.service";

export const walletAuthentication = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress, signature, secretMessage } = req.body as {
        signature?: string;
        secretMessage?: string;
        walletAddress?: string;
      };
      if (!walletAddress) {
        return next(
          new ErrorHandler(
            errorMessages.INVALID_WALLET_ADDRESS,
            StatusCode.BadRequest
          )
        );
      }

      const result = await walletAuthService.walletAuthentication(
        walletAddress,
        signature,
        secretMessage
      );
      return res.status(StatusCode.OK).json({
        success: true,
        message: result.message, 
        data: result.user || result.newUser, // User data
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BadRequest));
    }
  }
);
