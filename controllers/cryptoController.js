import Crypto from "../models/cryptoModel.js";

export const getStats = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({
        error: "Coin parameter is required",
      });
    }

    const validCoins = ["bitcoin", "ethereum", "matic-network"];
    const sanitizedCoin = coin.toLowerCase().trim();

    if (!validCoins.includes(sanitizedCoin)) {
      return res.status(400).json({
        error: "Invalid coin. Must be bitcoin, ethereum, or matic-network",
      });
    }

    const latestData = await Crypto.findOne(
      { coinId: sanitizedCoin },
      { price: 1, marketCap: 1, change24h: 1, _id: 0 }
    ).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({
        error: "No data found for the specified coin",
      });
    }

    // Format response exactly as required
    return res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    console.error("Error in getStats:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({
        error: "Coin parameter is required",
      });
    }

    const validCoins = ["bitcoin", "ethereum", "matic-network"];
    const sanitizedCoin = coin.toLowerCase().trim();

    if (!validCoins.includes(sanitizedCoin)) {
      return res.status(400).json({
        error: "Invalid coin. Must be bitcoin, ethereum, or matic-network",
      });
    }

    const records = await Crypto.find(
      { coinId: sanitizedCoin },
      { price: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .limit(100);

    if (!records.length) {
      return res.status(404).json({
        error: "No data found for the specified coin",
      });
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
    const variance =
      squaredDifferences.reduce((sum, diff) => sum + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    // Format response exactly as required
    return res.json({
      deviation: Number(standardDeviation.toFixed(2)),
    });
  } catch (error) {
    console.error("Error in getDeviation:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
