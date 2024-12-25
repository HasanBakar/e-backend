import express, { Application } from "express";
import cors from "cors";    
import {json, urlencoded} from "express";
import connectDB from './config/db';

const app: Application = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to e-backend  API! 🚀 Day 1 of 21 days coding hard challenge");
  });

export default app;