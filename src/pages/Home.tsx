import React from "react";

import "../components/parallaxImage.css";

import PhotoGrid from "../components/PhotoGrid/PhotoGrid";
import Service from "../components/services/Service";
import Reviewcards from "../components/Cards/Reviewcards";

import bannerImage from "../assets/images/banner_bg.jpg";
const Home = () => {
  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{
          backgroundImage: `url(${bannerImage})`,
          height: "50rem",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1
                className="mb-2"
                style={{
                  fontSize: "5rem",
                  fontWeight: "bold",
                }}
              >
                A Best Place To Stay
              </h1>
              <h6 className="mb-3">MAKE YOUR VACATION HAPPY</h6>
              <a
                href="/rooms"
                className="btn btn-outline-light btn-lg"
                role="button"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "2%",
            color: "white",
          }}
        >
          SCROLL
          <br />
          DOWN
          <br />
          ↓↓↓
        </div>
      </div>

      <PhotoGrid />
      <Service />
      <br />
      <Reviewcards path="review/top" />
    </header>
  );
};

export default Home;
