import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { checkOut } from "../../../ducks/reducer";
import { withRouter } from "react-router-dom";

import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "../../../constants/stripe";
import PAYMENT_SERVER_URL from "../../../constants/server";

const CURRENCY = "USD";

const fromUsdToCent = amount => amount * 100;

const successPayment = data => {
  alert("Payment Success");
};
const errorPayment = data => {
  alert("Payment Error");
};
const onToken = (amount, description, onClick) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUsdToCent(amount)
    })
    .then(() => {
      // this.props.history.push("/ordersubmitted")
      successPayment();
      window.location.href = "/#/ordersubmitted";
      onClick();
    })
    .catch(errorPayment);

function Checkout({ name, description, amount, onClick }) {
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={fromUsdToCent(amount)}
      token={onToken(amount, description, onClick)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  );
}
function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { checkOut })(Checkout));
