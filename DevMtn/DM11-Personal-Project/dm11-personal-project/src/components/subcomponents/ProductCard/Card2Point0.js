import React from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import swal from "sweetalert";
import FlatButton from "material-ui/FlatButton";

function Card2Point0(props) {
  let p = props.product;
  return (
    <div className="Card2Point0">
      <Card className="Card">
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          className="CardHeader"
        />
        <CardMedia
          overlay={
            <CardTitle
              title={p.name ? p.name : ""}
              subtitle={`x${p.quantity}`}
              className="OverlayTitle"
            />
          }
        >
          <img src={p.imgurl} alt="" className="" />
        </CardMedia>
        <CardTitle
          title="Card title"
          subtitle="Card subtitle"
          className="CardTitle"
        />
        <CardText>{p.description}</CardText>
        <CardActions>
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
          <h4>${p.price}</h4>
        </CardActions>
      </Card>
    </div>
  );
}
export default Card2Point0;
