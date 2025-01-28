export interface IUser extends Document {
    name: string;
    walletAddress?: string;
    signature?: string;
    seceretMessage?: string;
}
  