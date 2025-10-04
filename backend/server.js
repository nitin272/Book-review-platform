import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './infrasturcture/db_connection.js';
import routes from './http/routes/index.js';
import errorHandler from './http/middlewares/errorHandler.js';
import { connectRedis } from "./infrasturcture/redisConnection.js";

dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: ["http://localhost:4500", "https://book-review-platform.pages.dev"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.use(errorHandler);


const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();


