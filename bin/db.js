const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
