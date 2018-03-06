const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pl_live_MY_PUBLISHABLE_KEY"
    : "pk_test_YeWZnN4y4UTDWZRBX8gUNvWH";

export default STRIPE_PUBLISHABLE;
