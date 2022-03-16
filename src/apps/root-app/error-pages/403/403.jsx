import React from "react";

import "./style.scss";
import { logoutUser } from "../../utils/auth";

export default function Error403() {
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };
  return (
    <div className="root-div">
      <div className="lock d-flex justify-content-center">
        <span className="text-white align-self-center">403</span>
      </div>
      <div className="message">
        <h1>You can not access this page. </h1>
        <p>Please contact the system admin if you believe this is a mistake.</p>
        <a href="/" onClick={handleLogout}>
          Back to login
        </a>
      </div>
    </div>
  );
}
