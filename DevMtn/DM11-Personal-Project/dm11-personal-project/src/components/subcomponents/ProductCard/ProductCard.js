import React from "react";

import swal from "sweetalert";
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";

function ProductCard(props) {
  let p = props.product;
  return (
    <div className="ProductCard">
      <div className="flex center column space-between">
        <div className="pcImgBox">
          <img src={p.imgurl} className="cardImg" />
        </div>
        <h3>{p.name}</h3>
        <p className="pcDescription">{p.description}</p>
      </div>
      <div className="flex center addButton">
        <FlatButton
          onClick={() => {
            // swal({
            //   title: "Good job!",
            //   text: "You Added To Cart",
            //   icon: "success",
            //   button: "Aww yiss!"
            // });
            if (typeof props.user.id === "number")
              axios.post(`/api/cart/${p.id}`);
            else {
              swal({
                title: "Sign In",
                text: "You Must Be Signed In To Add Items To Cart"
              });
            }
          }}
          label="Add To Cart"
          primary={true}
        />
        <h4>${p.price} </h4>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(ProductCard);
