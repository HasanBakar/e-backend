import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    db_url: process.env.MONGO_URI  
}