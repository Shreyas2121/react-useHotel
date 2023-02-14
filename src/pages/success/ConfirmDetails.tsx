import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./success.css";

const ConfirmDetails = () => {
  const location = useLocation();
  const data = location.state.data;

  const key = location.state.key;

  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Booking is confirmed!!</h5>
        <p className="card-text">
          <span>Name: </span>
          {data.user.name}
        </p>
        <p className="card-text">
          <span>Email: </span>
          {data.user.email}
        </p>
        {key == "Hall" ? (
          <div>
            <p className="card-text">
              <span>Hall Name: </span>
              {data.category}
            </p>

            <p className="card-text">
              <span>Date: </span>
              {new Date(data.bookedDate).toDateString()}
            </p>
          </div>
        ) : (
          <div>
            <p className="card-text">
              <span>Room Name: </span>
              {data.category}
            </p>

            <p className="card-text">
              <span>Check-in: </span>
              {new Date(data.checkIn).toDateString()}
            </p>
            <p className="card-text">
              <span>Check-out: </span>
              {new Date(data.checkOut).toDateString()}
            </p>
          </div>
        )}

        <p className="card-text">
          <span>Total Price: </span>
          {data.total}
        </p>
        <button onClick={() => navigate("/")} id="btn">
          Go Home
        </button>
        {key == "Hall" ? (
          <div></div>
        ) : (
          <p>
            <small
              style={{
                marginLeft: "3.5rem",
                marginTop: "1rem",
              }}
              className=""
            >
              *Check-in: 12:00 PM, Check-out: 11:00 AM
            </small>
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmDetails;
