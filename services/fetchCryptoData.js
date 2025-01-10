import axios from "axios";
import Crypto from "../models/cryptoModel.js";

const fetchCryptoData = async () => {
  try {
    console.log("Starting crypto data fetch job...");

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,matic-network",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
        },
      }
    );

    const cryptoData = response.data;

    for (const crypto of cryptoData) {
      const newEntry = new Crypto({
        coinId: crypto.id,
        price: crypto.current_price,
        marketCap: crypto.market_cap,
        change24h: crypto.price_change_percentage_24h,
      });

      await newEntry.save();
      console.log(`Saved data for ${crypto.id}`);
    }

    console.log("Crypto data fetch job completed successfully");
  } catch (error) {
    console.error("Error in crypto data fetch job:", error.message);
    if (error.response) {
      console.error("API Response:", error.response.data);
    }
  }
};

export default fetchCryptoData;
