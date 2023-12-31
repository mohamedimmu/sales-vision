import mongoose from "mongoose";
import User from "../model/User.js";
import Transaction from "../model/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    // Aggregate Calls
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match with current user
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      }, // look up from the affilate stats table and compare the id of current user with userID in affilate stats and save it in the property called affilateStats
      { $unwind: "$affiliateStats" }, // flat the array
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSaleTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
