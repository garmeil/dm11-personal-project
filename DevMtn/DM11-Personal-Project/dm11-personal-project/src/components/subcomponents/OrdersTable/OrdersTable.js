import React from "react";
import OrderRow from "./OrderRow";
import "./OrdersTable.css";

class OrdersTable extends React.Component {
  render() {
    let orders = this.props.orders;
    let ordersReel = [];
    let tableHead = [];
    let tableCells = [];
    if (orders && orders.length > 0) {
      for (let key in orders[0]) {
        if (key != "imgurl" && key != "id") {
          tableHead.push(<th>{key}</th>);
        }
      }
      orders.forEach((val, index) =>
        ordersReel.push(<OrderRow key={index} orders={val} />)
      );
    }
    return (
      <table className="OrdersTable greyGridTable">
        <thead>
          <tr>{tableHead}</tr>
        </thead>
        <tbody>{ordersReel}</tbody>
      </table>
    );
  }
}

export default OrdersTable;
