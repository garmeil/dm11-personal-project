import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/subcomponents/Login/Login";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import AccountPage from "./components/AccountPage/AccountPage";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/shop" component={Shop} />
    <Route path="/about" component={About} />
    <Route path="/cart" component={Cart} />
    <Route path="/account" component={AccountPage} />
    <Route
      path="*"
      render={() => (
        <div>
          <p>NotFound</p>
        </div>
      )}
    />
  </Switch>
);
