import React from "react";

function OrderRow(props) {
  let stuff = [];
  for (let key in props.orders) {
    if (key !== "imgurl" && key !== "id")
      stuff.push(<td>{props.orders[key]}</td>);
  }
  return <tr>{stuff}</tr>;
}

export default OrderRow;
