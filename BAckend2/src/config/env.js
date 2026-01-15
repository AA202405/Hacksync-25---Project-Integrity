const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
