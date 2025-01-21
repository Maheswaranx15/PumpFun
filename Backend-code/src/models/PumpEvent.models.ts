import mongoose, { Document, Schema } from "mongoose";

export interface PumpEventDocument extends Document {
  eventId: number;
  token: string;
  startTime: number;
  endTime: number;
  targetPrice: string;
  totalContributed: string;
  completed: boolean;
}

const PumpEventSchema = new Schema<PumpEventDocument>({
  eventId: { type: Number, unique: true, required: true },
  token: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  targetPrice: { type: String, required: true },
  totalContributed: { type: String, default: "0" },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<PumpEventDocument>("PumpEvent", PumpEventSchema);
