import express from 'express';
import dotenv from 'dotenv';
import connectDB from './infrasturcture/db_connection.js';
import routes from './http/routes/index.js';
// import errorHandler from './http/middlewares/errorHandler.js';

dotenv.config({ path: './config/.env' });

const app = express();

connectDB();


app.use(express.json());


app.use('/api', routes);

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
