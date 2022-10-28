import React from "react";
import "../styles/Form.css";
import { useNavigate, Outlet, Link } from "react-router-dom";

import Banner from "./Banner";
import Login from "./Login";
import Footer from "./Footer";

function Signup() { 
  let navigate = useNavigate(); 

  function onSubmit(e) { // This function is called when the user clicks the submit button
    e.preventDefault(); // Prevents the page from reloading

    const data = new FormData(e.target); // This is the data that the user entered in the form

    fetch("http://localhost:3000/api/auth/signup", { // This is the API endpoint that we are sending the data to
      method: "POST", 
      body: JSON.stringify({  
        name: data.get("name"), // This is the name of the user
        lastName: data.get("lastName"), // This is the last name of the user
        email: data.get("email"), // This is the email of the user
        password: data.get("password"), // This is the password of the user
      }),
      headers: {
        "Content-Type": "application/json", // This is the type of data that we are sending
      },
    })
      .then(function (apiData) { // This is the response from the API
        if (apiData.ok) { // If the response is ok, then we redirect the user to the login page
          return apiData.json(); // We return the response as JSON
        }
      })
      .then(() => { // This is the JSON response from the API
        navigate("/login", { replace: true }); // We redirect the user to the login page
      })
      .catch(function (err) { // If there is an error, then we log it to the console
        console.error(`Retour du serveur : ${err}`); 
      });
  }

  return ( // This is the HTML that is returned
    <>
      <div className="main-container">
        <Banner />
        <main className="form-container">
          <form className="form-signup" onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Prénom"
                aria-label="Prénom"
                required
              ></input>
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom de famille"
                aria-label="Nom de famille"
                required
              ></input>
            </div>
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
              <button name="signup" type="submit" id="signup">
                S'inscrire
              </button>
            </div>
            <div className="line">Déjà inscrit(e) ?</div>
            <div>
              <Link to="/login" element={<Login />}>
                <button
                  className="btn-signup"
                  name="signup"
                  type="button"
                  id="buttonSignup"
                >
                  Identifiez-vous
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

export default Signup;
