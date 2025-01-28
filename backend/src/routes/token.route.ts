import express from "express";
import {
  createTokenHandler,
  buyTokenHandler,
  calculateCostHandler,
  getAllTokensHandler
} from "../controllers/token.controller";

const router = express.Router();

router.post("/create-token", createTokenHandler);
router.post("/buy-token", buyTokenHandler);
router.post("/calculate-cost", calculateCostHandler);
router.get("/all", getAllTokensHandler);
export default router;
