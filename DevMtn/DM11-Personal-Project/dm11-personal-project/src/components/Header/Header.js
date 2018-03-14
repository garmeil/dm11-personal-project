import React from "react";
import Logo from "../../imgs/Seed-Logo.png";
import { Link } from "react-router-dom";
import Hamburger from "../subcomponents/Hamburger/Hamburger";
import Auth from "../subcomponents/Login/Auth";

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (this.state.activeId) {
      document.getElementById(this.state.activeId).classList.remove("active1");
    }
    document.getElementById(e.target.id).classList.add("active1");
    this.setState({ activeId: e.target.id });
  }
  responsivity() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {
    return (
      <header>
        <div className="flex center header">
          <Link to="/">
            <img src={Logo} className="Header-Logo" />
          </Link>
          <Link to="/">
            <h1>Seeds</h1>
          </Link>
        </div>
        <div className="NavLinks">
          <div className="topnav" id="myTopnav">
            <div
              className="Nav-Item"
              id="Hamburger"
              onClick={() => {
                this.responsivity();
              }}
            >
              <Hamburger />
            </div>
            <Link to="/">
              <div
                className="Nav-Item"
                id="Home"
                onClick={e => this.handleClick(e)}
              >
                Home
              </div>
            </Link>
            <Link to="/Shop">
              <div
                className="Nav-Item"
                id="Shop"
                onClick={e => this.handleClick(e)}
              >
                Shop
              </div>
            </Link>
            <Link to="/Cart">
              <div
                className="Nav-Item"
                id="Cart"
                onClick={e => this.handleClick(e)}
              >
                Cart
              </div>
            </Link>
            <Link to="/contact">
              <div
                className="Nav-Item"
                id="Contact"
                onClick={e => this.handleClick(e)}
              >
                Contact Us
              </div>
            </Link>

            <div
              id="Auth"
              className="Login/Logout"
              onClick={e => this.handleClick(e)}
            >
              <Auth
                onClick={this.handleClick}
                id="Auth"
                className="Login/Logout"
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
