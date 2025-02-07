import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cron from "node-cron";
import fetchCryptoData from "./services/fetchCryptoData.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";

dotenv.config();

await connectDB();

const app = express();

app.use(express.json());

cron.schedule("0 */2 * * *", () => {
  console.log("Running scheduled job: Fetching crypto data...");
  fetchCryptoData();
});
// Health check route
app.get("/", (req, res) => {
  res.send("Crypto Tracker API is running");
});

app.use("/api", cryptoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
