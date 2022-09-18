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
    await mongoose.connect("mongodb://localhost:27017");
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(4000, () => {
  console.log("Listening on port 4000!!!!!!!!");
});

start();
