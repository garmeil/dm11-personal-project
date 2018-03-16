const FRONTEND_DEV_URLS = ["http://159.89.50.175:3007"];

const FRONTEND_PROD_URLS = ["https://159.89.50.175:3007"];

module.exports =
  process.env.NODE_ENV === "production"
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
