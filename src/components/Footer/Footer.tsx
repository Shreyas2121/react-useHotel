import React from "react";
import "./footer.css";

import image1 from "../../assets/images/fb.png";
import image4 from "../../assets/images/insta.png";
import image2 from "../../assets/images/G.png";
import image3 from "../../assets/images/twittr.png";

const Footer = () => {
  return (
    <footer className="tm-footer">
      <div className="tm-us">
        <p className="bold">About Us</p>
        <p>
          We are a part of chain of luxury hotels which extends all over the
          world. We provide a luxorious stay with various value added and free
          services which will make you visit us over and over again.
        </p>
      </div>
      <div className="tm-address">
        <p className="bold">Address</p>
        <p>
          415, UseHotel, Jaipur, Phone : (211) 9275693451 Email :
          usehotel@info.com
        </p>
      </div>
      <br />
      <div className="tm-media">
        <a href="#">
          {" "}
          <img src={image1} />
        </a>
        <a href="#">
          {" "}
          <img src={image2} />{" "}
        </a>
        <a href="#">
          {" "}
          <img src={image3} />{" "}
        </a>
        <a href="#">
          {" "}
          <img src={image4} />{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
