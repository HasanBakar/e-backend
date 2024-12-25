import mongoose from "mongoose";
import config from "./config";


const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(config.db_url! as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;