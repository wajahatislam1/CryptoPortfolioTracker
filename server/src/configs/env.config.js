require("dotenv").config();
const joi = require("joi");

const envSchema = joi
  .object({
    PORT: joi.number().positive().required(),
    JWT_SECRET_KEY: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
    SESSION_SECRET: joi.string().required(),
    GOOGLE_EMAIL: joi.string().required(),
    GOOGLE_PASSWORD: joi.string().required(),
    MONGODB_URI: joi.string().required(),
    COINMARKETCAP_API_KEY: joi.string().required(),
    COINCAP_API_KEY: joi.string().required(),
  })
  .unknown();

const { error } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
  MONGODB_URI: process.env.MONGODB_URI,
  COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
  COINCAP_API_KEY: process.env.COINCAP_API_KEY,
};
