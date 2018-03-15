import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProducts, searchProductsName } from "../../ducks/reducer";
import ProductCard from "../subcomponents/ProductCard/ProductCard";
import { BeatLoader } from "react-spinners";
import RaisedButton from "material-ui/RaisedButton";
import "../subcomponents/ProductCard/ProductCard.css";
import TextField from "material-ui/TextField";

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      category: ""
    };
    this.selectClick = this.selectClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  handleClick() {
    let query = document.getElementById("NameSearch").value;
    if (query) {
      this.props.searchProductsName(this.state.category, query);
    } else {
      this.props.getProducts(this.state.category);
    }
  }
  selectClick(e) {
    // console.log(e);
    this.setState({ category: e });
    if (e === "Select a Category") {
      this.props.getProducts("");
      return;
    }
    this.props.getProducts(e);
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
      <div className="Shop">
        <h1>Shop</h1>
        <div className="buttonBar">
          <RaisedButton label="All" onClick={() => this.selectClick("all")} />
          <RaisedButton
            label="Seeds"
            onClick={() => this.selectClick("seed")}
          />
          <RaisedButton label="Soil" onClick={() => this.selectClick("soil")} />
          <RaisedButton
            label="Fertilizer"
            className="getBack"
            onClick={() => this.selectClick("fertilizer")}
          />
          <RaisedButton
            label="Garden Utensils"
            onClick={() => this.selectClick("garden utensil")}
          />
        </div>
        <TextField
          hintText="SearchByName"
          id="NameSearch"
          className="NameSearch"
        />
        <RaisedButton
          label="Search"
          style={{ margin: 12 }}
          onClick={() => this.handleClick()}
          primary={true}
        />

        <div className="Gallery flex center column">{cardReel}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { products } = state;
  return state;
}

export default connect(mapStateToProps, { getProducts, searchProductsName })(
  Shop
);
