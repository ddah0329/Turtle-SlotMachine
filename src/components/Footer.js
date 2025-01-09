// Footer.js
import React from "react";
import "./Footer.css"; // CSS 파일을 import 합니다.

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Image */}
      <div className="footer_left">
        <img
          src="assets/footer_left.png"
          alt="Footer Left"
          className="footer_image"
        />
      </div>

      {/* Arrow */}
      <div className="footer_arrow">
        <div className="footer_line"></div>
        <div className="footer_arrowHead">&lt;</div>
      </div>

      {/* Right Image */}
      <div className="footer_turtle">
        <img
          src="assets/footer_turtle.png"
          alt="Footer Right"
          className="footer_image"
        />
      </div>

      {/* Right Image */}
      <div className="footer_right">
        <img
          src="assets/footer_right.png"
          alt="Footer Right"
          className="footer_image"
        />
      </div>
    </footer>
  );
};

export default Footer;
