import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import axios from "axios";

class CartDiv extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.remove = this.remove.bind(this);
  }
  addToCart(e) {
    axios
      .post(`/api/cart/${this.props.item.id}`)
      .then(response => this.props.handleClick());
  }
  deleteFromCart(e) {
    axios
      .delete(`/api/cart/${this.props.item.id}`)
      .then(response => this.props.handleClick());
  }
  remove() {
    axios
      .delete(`/api/cart/all/${this.props.item.id}`)
      .then(response => this.props.handleClick());
  }
  render() {
    return (
      <div className="CartDiv">
        <img src={this.props.item.imgurl} className="CartDivImg" />
        <h3>{this.props.item.name}</h3>
        <table />
        <div>
          <p>Qty: {this.props.quantity}</p>{" "}
          <FloatingActionButton onClick={this.addToCart} mini={true}>
            <ContentAdd />
          </FloatingActionButton>{" "}
          <FloatingActionButton onClick={this.deleteFromCart} mini={true}>
            <ContentRemove />
          </FloatingActionButton>
        </div>
        <button onClick={this.remove}>Remove</button>
        <h4>Price: {this.props.item.price * this.props.quantity}</h4>
      </div>
    );
  }
}

export default CartDiv;
