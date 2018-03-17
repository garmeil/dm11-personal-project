import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { withRouter } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/reducer";

function Logout(props) {
  return (
    <RaisedButton
      onClick={() => {
        swal("Successfully Logged Out");
        axios
          .get("/api/logout")
          .then(response => {
            console.log("/logged out");
            props.getUser().then(props.history.push("/login"));
          })
          .catch(err => console.log(err));
      }}
      className="LittleMargin"
      backgroundColor="#C7F3EB"
    >
      Logout
    </RaisedButton>
  );
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { getUser })(Logout));
