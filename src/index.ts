import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (
    !process.env.JWT_KEY ||
    !process.env.CLIENT_ID ||
    !process.env.CLIENT_SECRET
  ) {
    throw new Error("environment variable must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
    console.log("connected to mongoDB k8s pod");
  } catch (err) {
    console.log("mongoDB k8s pod is down, connecting fallback to localhost DB");
    try {
      await mongoose.connect("mongodb://localhost:27017");
      console.log("connected to local mongoDB");
    } catch (err) {
      console.log(err);
    }
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});

start();
