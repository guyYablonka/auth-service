import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { env } from "./config/config";
import { app } from "./app";

const start = async () => {
  if (!env.JWT_KEY) {
    throw new Error("JWT_KEY variable must be defined");
  }

  try {
    await mongoose.connect(env.MONGO_URL);
    console.log(`connected to mongoDB: ${env.MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
};

const port = env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}!!!!!!!!`);
});

start();
