import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { withRouter } from "react-router";

function Logout(props) {
  return (
    <button
      onClick={() => {
        swal("Successfully Logged Out");
        axios.get("/api/logout").then(response => props.history.push("/login"));
      }}
    >
      Logout
    </button>
  );
}

export default withRouter(Logout);
