import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { env } from "../config/config";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  env.JWT_KEY = "asdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const res = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookies = res.get("Set-Cookie");

  return cookies;
};
