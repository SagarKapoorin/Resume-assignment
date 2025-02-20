import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "./middleware/redis.js";
import { router } from "./routes/index.js";
dotenv.config();

const app = express();
app.use(rateLimit);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/api",router);
const PORT= process.env.PORT || "3000";
// console.log(PORT);
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://localhost:27017/mydatabase"; /*for docker based port*/
// console.log(MONGO_URL);
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) =>
    console.log(`${error} did not 
    connect`)
  );

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});