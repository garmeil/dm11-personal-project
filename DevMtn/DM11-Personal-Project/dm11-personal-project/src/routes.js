import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/subcomponents/Login/Login";
import Shop from "./components/Shop/Shop";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import AccountPage from "./components/AccountPage/AccountPage";
import OrderSubmitted from "./components/OrderSubmitted/OrderSubmitted";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/shop" component={Shop} />
    <Route path="/contact" component={Contact} />
    <Route path="/cart" component={Cart} />
    <Route path="/account" component={AccountPage} />
    <Route path="/ordersubmitted" component={OrderSubmitted} />
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
