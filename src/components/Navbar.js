// Navbar.js
import React from "react";
import "./Navbar.css"; // CSS 파일을 import 합니다.

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span
          className="navbar__link"
          onClick={() =>
            (window.location.href = "https://open.kakao.com/o/ssdPaEEe")
          }
        >
          가맹문의
        </span>
      </div>
      <div className="navbar__center">
        <span
          className="navbar__link"
          onClick={() =>
            (window.location.href = "https://turtlegame.my.canva.site/")
          }
        >
          <img
            src="assets/navbar_heyTurtle.png"
            alt="거북이 보드게임 카페 로고"
            className="navbar__logo"
          />
        </span>
      </div>
      <div className="navbar__right">
        <span
          className="navbar__link"
          onClick={() =>
            (window.location.href = "https://turtlegame.softr.app/")
          }
        >
          <img
            src="assets/navbar_search.png"
            alt="검색"
            className="navbar__icon"
          />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
