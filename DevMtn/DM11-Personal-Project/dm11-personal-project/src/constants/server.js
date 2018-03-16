const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://159.89.50.175:3007"
    : "http://localhost:3007";

export default PAYMENT_SERVER_URL;
