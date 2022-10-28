import React from "react";
import "../styles/Banner.css";
import logo from "../assets/icon-left-font.png";

function Banner() {
  return (
    <>
      <header className="App-banner">
        <img src={logo} className="logo" alt="Logo Groupomania" />
        <h1>
          Bienvenue dans l'outil qui vous aide à partager et à rester en contact
          avec vos collègues.
        </h1>
      </header>
    </>
  );
}

export default Banner;
