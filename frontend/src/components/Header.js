import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

import "../styles/Header.css";
import logo from "../assets/icon-left-font.png";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const monCompte = () => {
    navigate("/profile", { replace: true });
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      <header>
        <nav className="header-nav">
          <div className="header-logo-search">
            <Link to="/feed">
              <img src={logo} className="header-logo" alt="Logo Groupomania" />
            </Link>
          </div>
          <div>
            <input
              className="header-search"
              placeholder="Rechercher"
              aria-label="Rechercher"
              type="text"
            ></input>
          </div>
          <div className="header-menu">
            {menuIsOpen !== false ? (
              <>
                <button
                  className="header-menu-option"
                  onClick={logout}
                  title="Se déconnecter"
                >
                  <i className="fa-solid fa-lg fa-power-off"></i>
                </button>
                <button
                  className="header-menu-option"
                  onClick={monCompte}
                  title="Mon compte"
                >
                  <i className="fa-solid fa-lg fa-user"></i>
                </button>
                <button
                  className="header-nav-bar"
                  title="Retour"
                  onClick={() => {
                    setMenuIsOpen(false);
                  }}
                >
                  <i className="fa-solid fa-lg fa-bars"></i>
                </button>
              </>
            ) : (
              <button
                className="header-nav-bar"
                title="Menu"
                onClick={() => {
                  setMenuIsOpen(true);
                }}
              >
                <i className="fa-solid fa-lg fa-bars"></i>
              </button>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
