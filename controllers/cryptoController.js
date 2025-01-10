import Crypto from "../models/cryptoModel.js";

export const getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ error: "Please provide a coin name in the query parameter." });
  }

  const sanitizedCoin = coin.trim().toLowerCase();

  try {
    const latestData = await Crypto.findOne({ coinId: sanitizedCoin }).sort({
      timestamp: -1,
    });

    if (!latestData) {
      return res
        .status(404)
        .json({ error: `No data found for the coin: ${sanitizedCoin}` });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    console.error("Error in getStats:", error);
    res.status(500).json({ error: "Server error while fetching crypto stats" });
  }
};

export const getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ error: "Please provide a coin name in the query parameter." });
  }

  const sanitizedCoin = coin.trim().toLowerCase();

  try {
    const records = await Crypto.find({ coinId: sanitizedCoin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select("price");

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for the coin: ${sanitizedCoin}` });
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
    const variance =
      squaredDiffs.reduce((acc, diff) => acc + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
  } catch (error) {
    console.error("Error in getDeviation:", error);
    res
      .status(500)
      .json({ error: "Server error while calculating standard deviation" });
  }
};
