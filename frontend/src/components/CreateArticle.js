import React, { useState } from "react";
import axios from "axios";

import "../styles/CreateArticle.css";
import profileImage from "../assets/user-avatar.webp";

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function CreateArticle() {
  const [newArticle, setNewArticle] = useState(true);

  const [file, setFile] = useState(null);

  const createNewArticle = (e) => {
    e.preventDefault();

    let dataArticle = new FormData(e.target);

    axios
      .post(`http://localhost:3000/api/articles`, dataArticle, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setNewArticle(true);
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
      });
  };

  return newArticle ? (
    <div className="new-post">
      <div>
        <img
          src={
            currentUser.profilePicture !== ""
              ? currentUser.profilePicture
              : profileImage
          }
          className="user-avatar"
          alt=""
        />
        <button
          className="create-post"
          title="Créer une nouvelle publication"
          onClick={() => setNewArticle(false)}
        >
          <span>Salut {currentUser.name}, quoi de neuf ?</span>
          <i className="fa-regular fa-lg fa-image"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="new-post-container">
      <div className="container-top">
        <h2>Créer une publication</h2>
        <button className="cancel-post" onClick={() => setNewArticle(true)}>
          <i className="fa-solid fa-lg fa-xmark"></i>
        </button>
      </div>
      <div className="container-user">
        <img
          src={
            currentUser.profilePicture !== ""
              ? currentUser.profilePicture
              : profileImage
          }
          className="user-avatar"
          alt=""
        />
        <span className="user-name">
          {currentUser.name} {currentUser.lastName}
        </span>
      </div>
      <form
        className="new-post-form"
        onSubmit={createNewArticle}
        encType="multipart/form-data"
      >
        <div className="new-post-description">
          <input
            className="create-comment"
            name="description"
            id="post-description"
            placeholder="Ajouter une description..."
            aria-label="Ajouter une description"
            type="text"
          ></input>
        </div>
        {file && (
          <div className="new-img-preview">
            <img src={URL.createObjectURL(file)} className="new-image" alt="" />
            <button className="cancel-img" onClick={() => setFile(null)}>
              <i className="fa-solid fa-lg fa-xmark"></i>
            </button>
          </div>
        )}
        <div className="container-bottom">
          <div className="add-content">
            <div>
              <i
                className="face-smile fa-regular fa-lg fa-face-smile-beam"
                title="Ajouter des emojis"
              ></i>
            </div>
            <label htmlFor="file">
              <i
                className="add-image fa-regular fa-lg fa-image"
                title="Ajouter une image"
              ></i>
            </label>
            <input
              id="file"
              name="image"
              className="input-image"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            ></input>
            {file ? <p className="file-name">{file.name}</p> : null}
          </div>
          <button name="post" type="submit" id="post" className="share-post">
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;
