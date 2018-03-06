import React from "react";
import axios from "axios";

const Login = () => {
  return (
    <div>
      <a href={process.env.REACT_APP_LOGIN}>
        <button>Login</button>
      </a>
      <button
        onClick={() =>
          axios.get("/api/me").then(response => console.log(response.data))
        }
      >
        Me
      </button>
      <button
        onClick={() =>
          axios.get("/api/user").then(response => console.log(response.data))
        }
      >
        User
      </button>
    </div>
  );
};

export default Login;
