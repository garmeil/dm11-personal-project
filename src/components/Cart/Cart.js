import React from "react";
import Checkout from "../subcomponents/Checkout/Checkout";
import { connect } from "react-redux";
import { getCart, getUser, checkOut } from "../../ducks/reducer";
import CartDiv from "../subcomponents/ProductCard/CartDiv";
import axios from "axios";
import "../subcomponents/ProductCard/CartDiv.css";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import RaisedButton from "material-ui/RaisedButton";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { cartBasket: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleProductionClick = this.handleProductionClick.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.props.getCart();
  }

  precisionRound(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  redirect() {
    window.location.href = "/#/ordersubmitted";
  }
  handleClick() {
    this.props.getCart();
  }
  handleProductionClick() {
    console.log(this.props);
    if (this.props && this.props.cart.length > 0) {
      this.redirect();
    } else {
      swal({ text: "Put something in your cart" });
    }
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
        <div className="flex column center">
          <Checkout
            handleClick={this.handleClick}
            name={"Sown Seeds"}
            description={"Green"}
            amount={this.precisionRound(this.props.total * 1.0875, 2) || 1}
            onClick={this.handleClick}
            redirect={this.redirect}
          />
          {true ? (
            <RaisedButton
              onClick={this.handleProductionClick}
              redirect={this.redirect}
              label="Checkout"
              primary={true}
              className="LittleMargin"
            />
          ) : (
            ""
          )}
        </div>
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
