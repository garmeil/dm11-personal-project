const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? "sk_test_a2GcfGOsVeD5s34BoEi5vBBK"
    : "sk_test_a2GcfGOsVeD5s34BoEi5vBBK";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
