import express from 'express';

import {
  walletAuthentication,
} from '../controllers/wallet.controller';

const walletRouter = express.Router();

walletRouter.post(
  '/authentication',
  walletAuthentication
);


export default walletRouter;
