import React from "react";
import { connect } from "react-redux";
import { getUser, getOrders, getUserOrders } from "../../ducks/reducer";
import Logout from "../subcomponents/Login/Logout";
import OrdersTable from "../subcomponents/OrdersTable/OrdersTable";

class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getUser().then(response => {
      if (this.props.user.admin) {
        console.log("This dot Props dot User dot Admin is True");
        this.props.getOrders();
      } else {
        console.log("User Orders Got");
        this.props.getUserOrders(this.props.user.id);
      }
    });
  }
  handleClick() {
    if (this.props.user.admin) {
      this.props.getOrders(this.state.userInput);
    } else {
      this.props.getUserOrders(this.state.userInput);
    }
  }
  render() {
    return (
      <div>
        <h1>{`Hello, ${this.props.user.full_name}`}</h1>

        <Logout />
        <div className="orderInput">
          <input
            placeholder="Search By Order ID"
            id="ordersCriteria"
            onChange={e => this.setState({ userInput: e.target.value })}
          />
          <button className="" onClick={this.handleClick}>
            Search
          </button>
        </div>
        <OrdersTable orders={this.props.orders} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, orders } = state;
  return { user, orders };
}

export default connect(mapStateToProps, { getUser, getOrders, getUserOrders })(
  AccountPage
);
