import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const corsMiddleware = require('./corsConfig');


const app = express();


app.use(corsMiddleware);

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
