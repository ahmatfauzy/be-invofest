import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);