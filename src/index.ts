import express from "express";
import dotenv from "dotenv";
import login from "./routes/AuthRoutes"
import regist from "./routes/CompetitionRoutes"
import adminRoutes from "./routes/AdminRoutes";


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

app.use("/auth", login)
app.use("/competition", regist)
app.use("/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
