import mongoose, { Schema, Document } from "mongoose";
import { IToken } from "../interfaces/Itoken.interface";

const TokenSchema: Schema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  tokenAddress: { type: String, required: true, unique: true },
  creatorAddress: { type: String, required: true },
  fundingRaised: { type: Number, default: 0 },
});

export default mongoose.model<IToken>("Token", TokenSchema);
