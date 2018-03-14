import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { withRouter } from "react-router";
import RaisedButton from "material-ui/RaisedButton";

function Logout(props) {
  return (
    <RaisedButton
      onClick={() => {
        swal("Successfully Logged Out");
        axios.get("/api/logout").then(response => props.history.push("/login"));
      }}
      className="LittleMargin"
      backgroundColor="#C7F3EB"
    >
      Logout
    </RaisedButton>
  );
}

export default withRouter(Logout);
