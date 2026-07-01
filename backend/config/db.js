import mongoose from 'mongoose';
import dotenv from "dotenv";

export const connectDB = async () => {
    try{
        const dbUri = process.env.mongo_url || process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;
        if (!dbUri) {
            throw new Error("MongoDB connection string is missing. Please set the 'mongo_url' or 'MONGO_URI' environment variable in your environment settings.");
        }
        const conn = await mongoose.connect(dbUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

};