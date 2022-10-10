const env = {
  JWT_KEY: process.env.JWT_KEY,
  CLIENT_ID: process.env.CLIENT_ID || "fdsfds",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "fdsfds",
  CLIENT_URL: process.env.CLIENT_URL,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "local",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
};

export { env };
