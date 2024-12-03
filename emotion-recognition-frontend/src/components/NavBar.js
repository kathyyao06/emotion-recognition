import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          Emotion Recognition
        </NavLink>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/EmotionRecognitionImage" className="nav__link">
                Emotion Recognition (Image)
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/EmotionRecognitionVideo" className="nav__link">
                Emotion Recognition (Video)
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
