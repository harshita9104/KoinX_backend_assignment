import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ["bitcoin", "ethereum", "matic-network"],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
cryptoSchema.index({ coinId: 1, timestamp: -1 });

export default mongoose.model("Crypto", cryptoSchema);
