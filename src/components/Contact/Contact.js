import React from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import axios from "axios";
import swal from "sweetalert";

class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      email: "",
      message: ""
    };
  }
  componentDidMount() {
    this.props.getUser().then(() => {
      this.setState({
        full_name: this.props.user.full_name,
        email: this.props.user.email
      });
    });
  }
  render() {
    return (
      <div className="ContactUs">
        <h3>Contact Us</h3>
        <div className="fname">
          Full Name{" "}
          <TextField
            onChange={e => this.setState({ full_name: e.target.value })}
            hintText={this.props.user.full_name || "Full Name"}
          />
        </div>
        <div className="email">
          Email Address{" "}
          <TextField
            onChange={e => this.setState({ email: e.target.value })}
            hintText={this.props.user.email || "Email"}
          />
        </div>
        <div className="cmessage">
          Message{" "}
          <TextField
            onChange={e => this.setState({ message: e.target.value })}
            hintText="Talk to Us"
          />
        </div>
        <button
          onClick={() => {
            this.state.full_name && this.state.email && this.state.message
              ? axios
                  .post("/api/message", this.state)
                  .then(response => swal({ text: "Message submitted!" }))
                  .catch(err => console.log(err))
              : swal({ title: "All fields required" });
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUser })(Contact);
