import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { checkOut, getOrders } from "../../ducks/reducer";
import { BeatLoader } from "react-spinners";
import OrdersTable from "../subcomponents/OrdersTable/OrdersTable";

class OrderSubmitted extends React.Component {
  constructor() {
    super();
    this.state = {
      order: [],
      toggle: false
    };
  }
  componentDidMount() {
    this.props
      .checkOut()
      .then(response =>
        this.props
          .getOrders(this.props.currentOrder[0].orderid)
          .then(response => console.log(response))
      );
  }
  render() {
    return (
      <div>
        <h2>Order Successful</h2>
        <h5>Review Order Summary</h5>
        <button
          label="this.props.getOrders(this.props.currentOrder[0].orderid)"
          onClick={() => {
            this.setState({ toggle: !this.state.toggle });
            this.props.getOrders(this.props.currentOrder[0].orderid);
          }}
        >
          Order Summary
        </button>
        {this.state.toggle ? (
          <h6>
            {this.props.currentOrder.length > 0 ? (
              <div>
                <OrdersTable orders={this.props.orders} />
              </div>
            ) : (
              <BeatLoader color="#36D7B7" />
            )}
          </h6>
        ) : (
          " "
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { checkOut, getOrders })(
  OrderSubmitted
);
