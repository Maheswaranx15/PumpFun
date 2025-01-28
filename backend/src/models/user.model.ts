require("dotenv").config();
import mongoose, {  Model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    signature: {
      type: String,
    },
    seceretMessage: {
      type: String,
    }
  }
);


const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
