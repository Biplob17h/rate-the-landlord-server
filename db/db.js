import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB `.magenta.bold);
    } catch (error) {
        console.log(`Err in MongoDB ${error}`.red.bold);
    }
}


export default connectDB;