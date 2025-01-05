// Footer.js
import React from "react";
import "./Footer.css"; // CSS 파일을 import 합니다.

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Image */}
      <div className="footer__left">
        <img
          src="assets/footer_left.png"
          alt="Footer Left"
          className="footer__image"
        />
      </div>

      {/* Arrow */}
      <div className="footer__arrow">
        <div className="footer__line"></div>
        <div className="footer__arrowText">&lt;</div>
      </div>

      {/* Right Image */}
      <div className="footer__right">
        <img
          src="assets/footer_turtle.png"
          alt="Footer Right"
          className="footer__image"
        />
      </div>

      {/* Right Image */}
      <div className="footer__rightImage">
        <img
          src="assets/footer_right.png"
          alt="Footer Right"
          className="footer__image"
        />
      </div>
    </footer>
  );
};

export default Footer;
