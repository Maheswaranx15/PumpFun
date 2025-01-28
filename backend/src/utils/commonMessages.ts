import { REPLY_TEXT_MAX_LENGTH } from "./reply.constant";

export const errorMessages = {
  USER_NOT_FOUND: "User not found",
  INSUFFICIENT_FUNDS_ERROR : 'Insufficient Funds',
  PAYMENT_FAIL_STATUS_ERROR :  'Payment failed error',
  TOKEN_TRANSFER_FAILED_ERROR : 'Failed to transfer tokens',
  INVALID_WALLET_ADDRESS : 'Invalid ethereum address',
  NOT_IMPLEMENTED_ERROR : 'Method not implemented.',
  WALLET_ALREADY_EXIST: "Wallet Already Exist",
  INVALID_SIGNATURE :'Invalid signature',
  UNEXPECTED_ERROR : 'An unexpected error occurred.',
  INVALID_PARAMETER: "Invalid parameter",
};

export const successMessages = {
  PRODUCT_PURCHASED:'Product purchased successfully',
  WALLET_DETAILS_UPDATED : 'Wallet details updated Successfully',
  LOGIN_SUCCESS : 'Login Successfully',
  USER_SUCCESS: "User created successfully",
  
};
