import React from "react";
import Checkout from "../subcomponents/Checkout/Checkout";
import { connect } from "react-redux";
import { getCart, getUser, checkOut } from "../../ducks/reducer";
import CartDiv from "../subcomponents/ProductCard/CartDiv";
import axios from "axios";
import "../subcomponents/ProductCard/CartDiv.css";
import _ from "lodash";
import { withRouter } from "react-router-dom";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { cartBasket: [] };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getCart();
  }

  precisionRound(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  handleClick() {
    this.props.getCart();
  }

  render() {
    let cartBasket =
      this.props.cart.length > 0
        ? _.uniqWith(this.props.cart, _.isEqual).map((val, index) => {
            let quantity = this.props.cart.filter(
              item => item.name === val.name
            ).length;
            return (
              <CartDiv
                handleClick={this.handleClick}
                item={val}
                quantity={quantity}
                key={index}
              />
            );
          })
        : "Nothing In Basket";

    return (
      <div>
        <h1>Total: ${this.precisionRound(this.props.total, 2) || "0"} </h1>
        <Checkout
          handleClick={this.handleClick}
          name={"Sown Seeds"}
          description={"Green"}
          amount={this.precisionRound(this.props.total * 1.0875, 2) || 1}
          onClick={this.handleClick}
        />
        <div>{cartBasket}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cart } = state;
  return state;
}

export default withRouter(
  connect(mapStateToProps, { getCart, getUser, checkOut })(Cart)
);
