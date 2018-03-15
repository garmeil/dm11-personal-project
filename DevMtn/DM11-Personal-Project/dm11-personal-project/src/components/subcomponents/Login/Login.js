import React from "react";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";

class Login extends React.Component {
  componentDidMount() {
    axios.get("/api/me");
  }
  render() {
    return (
      <div>
        <a href={process.env.REACT_APP_LOGIN}>
          <RaisedButton className="LittleMargin" backgroundColor="#C7F3EB">
            Login
          </RaisedButton>
        </a>
      </div>
    );
  }
}

export default Login;
