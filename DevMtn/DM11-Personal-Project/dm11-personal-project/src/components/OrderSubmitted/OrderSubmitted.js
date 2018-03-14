import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { checkOut } from "../../ducks/reducer";
import { BeatLoader } from "react-spinners";
import OrdersTable from "../subcomponents/OrdersTable/OrdersTable";

class OrderSubmitted extends React.Component {
  constructor() {
    super();
    this.state = {
      order: []
    };
  }
  componentDidMount() {
    this.props
      .checkOut()
      .then(response => this.setState({ order: this.props.currentOrder }));
  }
  render() {
    return (
      <div>
        <h2>Order Successful</h2>
        <h5>Review Order Summary</h5>
        <h6>
          {this.props.currentOrder.length > 0 ? (
            <div>
              <OrdersTable orders={this.props.currentOrder} />
            </div>
          ) : (
            <BeatLoader color="#36D7B7" />
          )}
        </h6>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { checkOut })(OrderSubmitted);
