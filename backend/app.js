import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import AuthRoute from "./routes/auths.js";
import UserRoute from "./routes/users.js";
const app = express();

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(cors());

app.use(morgan("common"));

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED MONGODB");
  } catch (error) {
    throw error;
  }
};

// MONGOOSE CONNECTION
mongoose.connection.on("disconnected", () => {
  console.log("MONGODB DISCONNECTED");
});
mongoose.connection.on("connected", () => {
  console.log("MONGODB CONNECTED");
});

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);

app.listen(PORT, () => {
  connect();
  console.log("CONNECTED BACKEND SUCCESS");
});
