const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.log("MongoDB connection URL missing");
    }
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb at " + mongoose.connection.host);
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = connectDB;
