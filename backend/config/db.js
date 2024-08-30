import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connection = await mongoose.connect(
      "mongodb+srv://dnyanuburange1214:G8yjOl4LFcrHk9DT@cluster0.nodsxbg.mongodb.net/appointmentmanagement"
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error while connectiong", error);
  }
};

export default connectDb;
