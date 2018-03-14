import React from "react";
import { connect } from "react-redux";
import { getUser, getOrders, getUserOrders } from "../../ducks/reducer";
import AccountInfo from "../subcomponents/AccountInfo/AccountInfo";
import Logout from "../subcomponents/Login/Logout";
import OrdersTable from "../subcomponents/OrdersTable/OrdersTable";
import TextField from "material-ui/TextField";

class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      toggle: false
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
  clickHandler(id) {
    document.getElementById(id).value;
  }
  render() {
    return (
      <div>
        <h1>{`Hello, ${this.props.user.full_name}`}</h1>
        <button onClick={() => console.log(this.props.user)} />

        <Logout />
        <AccountInfo />
        <button onClick={() => this.setState({ toggle: !this.state.toggle })}>
          Show Orders
        </button>
        {this.state.toggle ? (
          <div>
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
        ) : (
          ""
        )}
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
