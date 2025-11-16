import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import corsMiddleware from "./corsConfig"; 

import login from "./routes/AuthRoutes";
import regist from "./routes/CompetitionRoutes";
import adminRoutes from "./routes/AdminRoutes";
import eventRoutes from "./routes/EventRoutes";

const app = express();
app.use(corsMiddleware);
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  res.send({ message: "API is working" });
});

app.use("/auth", login);
app.use("/competition", regist);
app.use("/admin", adminRoutes);
app.use("/event", eventRoutes);

export default app;


// develop
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });