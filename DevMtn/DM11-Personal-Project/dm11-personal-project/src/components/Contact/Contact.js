import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="ContactUs">
        <h3>Contact Us</h3>
        <div className="fname">
          Full Name <input className="" />
        </div>
        <div className="email">
          Email Address <input className="" />
        </div>

        <div className="onumber">
          Order Number (Optional) <input className="" />
        </div>
        <div className="cmessage">
          Message <input className="" />
        </div>
        <button>Submit</button>
      </div>
    );
  }
}

export default Contact;
