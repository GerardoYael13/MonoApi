import mongoose from "mongoose";
import { envs } from "../config/envs.plugin";

export class MongoDatabase {
    
    static async connect() {
        const mongoUrl = envs.MONGO_URL; 

        try {
            
            await mongoose.connect(mongoUrl);
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', (error as Error).message);
            process.exit(1); 
        }
    }
}