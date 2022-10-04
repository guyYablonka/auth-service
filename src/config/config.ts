const env = {
  JWT_KEY: process.env.JWT_KEY || "",
  CLIENT_ID: process.env.CLIENT_ID || "",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "local",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
};

export { env };
