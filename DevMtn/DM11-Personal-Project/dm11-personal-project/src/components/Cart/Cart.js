import React from "react";
import Checkout from "../subcomponents/Checkout/Checkout";
import { connect } from "react-redux";
import { getCart } from "../../ducks/reducer";
import ProductCard from "../subcomponents/ProductCard/ProductCard";
import axios from "axios";

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
        ? this.props.cart.map((val, index) => {
            //render cart items using ProductCard component
            return (
              <ProductCard
                product={val}
                key={index}
                onClick={this.handleClick}
              />
            );
          })
        : "Empty Cart";
    return (
      <div>
        <button
          onClick={() =>
            axios
              .get("/api/checkout")
              .then(response => this.handleClick())
              .catch(console.log)
          }
        >
          Checkout
        </button>
        <h1>Total: ${this.precisionRound(this.props.total, 2) || "0"} </h1>
        <Checkout name={"Sown Seeds"} description={"Green"} amount={1} />
        <div>{cartBasket}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cart } = state;
  return state;
}

export default connect(mapStateToProps, { getCart })(Cart);
