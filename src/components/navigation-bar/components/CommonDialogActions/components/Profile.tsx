import React from "react";

// import styles
import "./profile.scss";

// import images
import Placeholder from "../../../../../assets/img/user-profile.jpg";

export default class Profile extends React.Component<any, any> {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <img src={Placeholder} alt="user-img" />
          <div className="user-details">
            <h1>Marvin McKinney</h1>
            <p>mmckinney19@email.com</p>
          </div>
        </div>
        <div className="profile-main-content">
          <div className="profile-options">
            <ul>
              <li className="active">Contact</li>
              <li>Password</li>
              <li>Payment Information</li>
              <li>Preferences</li>
              <li>Notifications</li>
              <li>Log Out</li>
            </ul>
          </div>
          <div className="profile-data">
            <div className="contact-form">
              <label>NAME</label>
              <input
                type="text"
                id="name"
                className="setup-input-fields"
                name="name"
              />
              <label>EMAIL</label>
              <input
                type="text"
                id="name"
                className="setup-input-fields"
                name="name"
              />
              <label>PHONE</label>
              <input
                type="text"
                id="name"
                className="setup-input-fields"
                name="name"
              />
              <label>ADDRESS</label>
              <input
                type="text"
                id="name"
                className="setup-input-fields"
                name="name"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
