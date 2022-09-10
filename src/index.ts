import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY environment variable must be defined");
  }

  try {
    await mongoose.connect("mongodb://localhost:3001");
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(4000, () => {
  console.log("Listening on port 4000!!!!!!!!");
});

start();
