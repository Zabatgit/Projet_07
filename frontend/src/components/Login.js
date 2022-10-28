import React, { useState } from "react";
import "../styles/Form.css";
import { useNavigate, Outlet, Link } from "react-router-dom";

import Banner from "./Banner";
import Signup from "./Signup";
import Footer from "./Footer";

function Login() { 
  let navigate = useNavigate(); 
  const refreshPage = () => { 
    navigate(0);
  };
  const [userAuth, setUserAuth] = useState(false); // This is the state of the user
  const [userKeyRef, setUserKeyRef] = useState(null); 

  window.localStorage.setItem("userAuth", userAuth); 
  window.localStorage.setItem("userKeyRef", userKeyRef); // This is the key of the user in the database

  function onSubmit(e) { // This function is called when the user clicks the submit button
    e.preventDefault(); // Prevents the page from reloading

    const data = new FormData(e.target); // This is the data that the user entered in the form

    fetch("http://localhost:3000/api/auth/login", { // This is the API endpoint that we are sending the data to
      method: "POST", 
      body: JSON.stringify({ // This is the data that we are sending to the API
        email: data.get("email"), // This is the email of the user
        password: data.get("password"), // This is the password of the user
      }),
      headers: {
        "Content-Type": "application/json", // This is the type of data that we are sending
      },
    })
      .then(function (apiData) { // This is the response from the API
        if (apiData.ok) { // If the response is ok, then we redirect the user to the login page
          setUserAuth(true); // We set the state of the user to true
          return apiData.json(); // We return the response as JSON
        }
      })
      .then((res) => { // This is the JSON response from the API
        window.localStorage.setItem( // We set the key of the user in the database
          "currentUser", 
          JSON.stringify(res.currentUser) // We stringify the response
        );
        window.localStorage.setItem("userKeyRef", res.keyRef); // We set the key of the user in the database
        window.localStorage.setItem("token", res.token); // We set the token of the user in the database
        setUserKeyRef(res.keyRef); 
        navigate("/feed", { replace: true }); // We redirect the user to the feed page
        refreshPage(); // We refresh the page
      })
      .catch(function (err) { // If there is an error, then we log it to the console
        console.error(`Retour du serveur : ${err}`);
      });
  }

  return (
    <>
      <div className="main-container">
        <Banner />
        <main className="form-container">
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Adresse e-mail"
                aria-label="Adresse e-mail"
                required
              ></input>
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                required
              ></input>
            </div>
            <div>
              <button name="login" type="submit" id="login">
                S'identifier
              </button>
            </div>
            <div className="line">Première visite sur l'app ?</div>
            <div>
              <Link to="/signup" element={<Signup />}>
                <button
                  className="btn-signup"
                  name="signup"
                  type="button"
                  id="buttonSignup"
                >
                  Inscrivez-vous
                </button>
              </Link>
            </div>
            <Outlet />
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Login;
