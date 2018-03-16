import React from "react";
import { connect } from "react-redux";
import { getUser, editUserInfo } from "../../../ducks/reducer.js";
import TextField from "material-ui/TextField";
import axios from "axios";
import swal from "sweetalert";
import IconButton from "material-ui/IconButton";
import ActionSave from "material-ui/svg-icons/content/save";
import DeleteAll from "material-ui/svg-icons/content/delete-all";
import RaisedButton from "material-ui/RaisedButton";

class AccountInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipcode: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }
  componentDidMount() {
    this.props.getUser().then(response =>
      this.setState({
        full_name: this.props.user.full_name,
        email: this.props.user.email,
        address: this.props.user.address,
        city: this.props.user.city,
        state: this.props.user.state,
        zipcode: this.props.user.zipcode
      })
    );
  }
  handleClick(body) {
    this.props.editUserInfo(body).then(response => {
      swal({ title: "Good job!", text: "Profile Updated!" });
      this.props.getUser().then(response =>
        this.setState({
          full_name: this.props.user.full_name,
          email: this.props.user.email,
          address: this.props.user.address,
          city: this.props.user.city,
          state: this.props.user.state,
          zipcode: this.props.user.zipcode
        })
      );
    });
  }
  deleteClick(id) {
    axios
      .delete("/api/deleteUser")
      .then(response => props.getUser().then(props.history.push("/login")));
  }
  render() {
    return (
      <div className="AccountInfo">
        <div className="AInfo">
          <h2>Account Info</h2>

          <div className="SaveChangesMobi">
            <IconButton
              onClick={() =>
                // prettier-ignore
                this.handleClick(this.state)
              }
              tooltip="Save Changes"
              touch={true}
              tooltipPosition="top-left"
            >
              <ActionSave />
            </IconButton>
            <IconButton
              onClick={() =>
                // prettier-ignore
                swal({text: "Delete account?"})
              }
              tooltip="Save Changes"
              touch={true}
              tooltipPosition="top-left"
            >
              <DeleteAll />
            </IconButton>
          </div>
        </div>
        <div className="flex">
          <h3>Name: </h3>
          <TextField
            id="account-name-input"
            defaultValue={this.props.user.full_name}
            onChange={e => this.setState({ full_name: e.target.value })}
          />
        </div>
        <div className="flex emailinfo">
          <h3>Email: </h3>
          <TextField
            id="text-field-default"
            defaultValue={this.props.user.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="flex adressinfo">
          <h3>Address: </h3>
          <TextField
            id="text-field-default"
            defaultValue={this.props.user.address}
            onChange={e => this.setState({ address: e.target.value })}
          />
        </div>
        <div className="flex cityinfo">
          <h3>City: </h3>
          <TextField
            id="text-field-default"
            defaultValue={this.props.user.city}
            onChange={e => this.setState({ city: e.target.value })}
          />
        </div>
        <div className="flex stateinfo">
          <h3>State: </h3>
          <TextField
            id="text-field-default"
            defaultValue={this.props.user.state}
            onChange={e => this.setState({ state: e.target.value })}
          />
        </div>
        <div className="flex zipcodeinfo">
          <h3>Zipcode: </h3>
          <TextField
            id="text-field-default"
            defaultValue={this.props.user.zipcode}
            onChange={e => this.setState({ zipcode: e.target.value })}
          />
        </div>
        <div className="SaveChangesDsktp">
          <RaisedButton
            label="Save Changes"
            primary={true}
            style={{ margin: 12, alignSelf: "center" }}
            onClick={() =>
              // prettier-ignore
              this.handleClick(this.state)
            }
          />

          <RaisedButton
            label="Delete Account"
            secondary={true}
            style={{ margin: 12, alignSelf: "center" }}
            onClick={() => {
              if (window.confirm("Do you really want to delete you account?")) {
                this.deleteClick(this.props.user.id);
              }
            }}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, { getUser, editUserInfo })(AccountInfo);
