require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const request = require("request");
const Auth0Strategy = require("passport-auth0");
const SERVER_CONFIGS = require("./constants/server");
const configureServer = require("./server");
const configureRoutes = require("./routes");
const createInitialSession = require("./middleware/session");

const port = 3007;

const app = express();
const {
  getProducts,
  getProductsByCategory
} = require("./controllers/shopController");
const {
  addToCart,
  readFromCart,
  deleteFromCart,
  checkOut
} = require("./controllers/cartController");
const {
  getOrders,
  getOrderById,
  getOrderByUser
} = require("./controllers/orderController");

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: { maxage: 100000 }
  })
);

app.use(createInitialSession);

//v---STRIPE SETUP
configureServer(app);
configureRoutes(app);

//^--- STRIPE SETUP

//SETTING UP AUTHENTICATION IS AWESOME
const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/login"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId(
                profile.id,
                profile._json.name,
                profile.name.givenName,
                profile.name.familyName
              )
              .then(created => {
                done(null, created[0]);
              })
              .catch(console.log);
          } else {
            return done(null, response[0]);
          }
        })
        .catch(console.log);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
//^---- ALL THIS IS AUTH

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3000/#/login"
  })
);

app.get("/api/me", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.redirect("http://localhost:3000/#/login");
});

app.get("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/login");
  });
});

app.get("/api/test", (req, res, next) => {
  req.app
    .get("db")
    .getUser()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

app.get("/api/user", (req, res, next) => {
  console.log(req.session.user);
});
app.get("/api/getProducts", getProducts);
app.get("/api/getProducts/:category", getProductsByCategory);

//CART ENPOINTS
app.get("/api/cart", readFromCart);
app.post("/api/cart/:id", addToCart);
app.delete("/api/cart/:id", deleteFromCart);
app.get("/api/checkout", checkOut);

//ORDER ENDPOINTS
app.get("/api/orders", getOrders);
app.get("/api/orders/:id", getOrderById);
app.get("/api/userOrders", getOrderByUser);

app.listen(port, () => console.log(`Now Listening on Port: ${port}`));
