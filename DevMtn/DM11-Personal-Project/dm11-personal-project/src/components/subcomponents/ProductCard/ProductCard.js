import React from "react";
import "./ProductCard.css";
import swal from "sweetalert";
import axios from "axios";

function ProductCard(props) {
  let p = props.product;
  return (
    <div className="ProductCard">
      <h3>{p.name}</h3>
      <img src={p.imgurl} className="cardImg" />
      <p>{p.description}</p>
      <p>Category: {p.category}</p>
      <p>Price: {p.price}</p>
      <p>Quantity: {p.quantity}</p>
      <button
        onClick={() => {
          swal({
            title: "Good job!",
            text: "You Added To Cart",
            icon: "success",
            button: "Aww yiss!"
          });
          axios.post(`/api/cart/${p.id}`);
        }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          swal({
            title: "Good job!",
            text: "You Removed From Cart!",
            icon: "success",
            button: "Aww yiss!"
          });
          axios.delete(`/api/cart/${p.id}`).then(response => props.onClick());
        }}
      >
        Remove From Cart
      </button>
    </div>
  );
}

export default ProductCard;
