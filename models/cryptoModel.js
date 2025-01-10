import { Schema, model } from "mongoose";

const cryptoSchema = new Schema({
  coinId: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Crypto = model("Crypto", cryptoSchema);
export default Crypto;
