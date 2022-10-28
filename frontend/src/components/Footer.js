import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logo-white.png";

function Footer() {
  return (
    <footer>
      <div>
        <div>
          <div>
            <img className="footer-logo" src={logo} alt="Logo Groupomania" />
          </div>
          <div>
            <p>
              Aide :&nbsp;
              <a href="mailto:support@groupomania.com">
                support@groupomania.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>
            © Copyright 2022 | All Rights Reserved | Built by {' '}
            <a href="*">
              Laurent Blanc
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
