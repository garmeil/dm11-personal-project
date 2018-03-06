import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/reducer";
import { Link } from "react-router-dom";

class Auth extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div>
        {!this.props.user.full_name ? (
          <Link to="/login">"Login"</Link>
        ) : (
          <Link to="/account">{`${this.props.user.full_name}`}</Link>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { getUser })(Auth);
