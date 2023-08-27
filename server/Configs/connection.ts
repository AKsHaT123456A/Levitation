import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akshatakshatsrajan:GNMPY3ih6zF8wb1z@cluster0.idzbcwo.mongodb.net/"
    );
    console.log("Connected to database");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
