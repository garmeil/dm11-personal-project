import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getAll } from "../../ducks/reducer";
import ProductCard from "../subcomponents/ProductCard/ProductCard";
import { BeatLoader } from "react-spinners";

class Shop extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAll();
  }
  render() {
    let cardReel =
      this.props.products.length > 0 ? (
        this.props.products.map((val, index) => {
          return <ProductCard product={val} key={index} />;
        })
      ) : (
        <BeatLoader color="#36D7B7" />
      );
    return (
      <div>
        <h1>Shop</h1>
        <div className="Gallery flex center column">{cardReel}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { products } = state;
  return state;
}

export default connect(mapStateToProps, { getAll })(Shop);
