const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_test_YeWZnN4y4UTDWZRBX8gUNvWH"
    : "pk_test_YeWZnN4y4UTDWZRBX8gUNvWH";

export default STRIPE_PUBLISHABLE;
