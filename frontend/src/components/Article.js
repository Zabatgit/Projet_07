import axios from "axios";
import React, { useState } from "react";

import "../styles/Article.css";
import profileImage from "../assets/user-avatar.webp";

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function Article(article) {
  const [comment, setComment] = useState(false);
  const [options, setOptions] = useState(false);

  const [newFile, setNewFile] = useState(null);

  const [modify, setModify] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [like, setLike] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(false);

  const [newComment, setNewComment] = useState(false);
  // const [commentOptions, setCommentOptions] = useState(false);
  // const [modifyComment, setModifyComment] = useState(false);

  const [confirmDeleteComment, setConfirmDeleteComment] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});

  const onComment = () => {
    try {
      axios
        .post(
          `http://localhost:3000/api/articles/${article.postRef}/comment`,
          { newComment, currentUser },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .catch(function (err) {
          console.error(`Retour du serveur : ${err}`);
        });
    } catch (err) {
      console.error(`Retour du serveur : ${err}`);
    }
  };

  const onDeleteComment = () => {
    // console.log(commentToDelete.creation);
    try {
      axios
        .put(
          `http://localhost:3000/api/articles/${article.postRef}/comments/${commentToDelete.creation}`,
          commentToDelete,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .catch(function (err) {
          console.error(`Retour du serveur : ${err}`);
        });
    } catch (err) {
      console.error(`Retour du serveur : ${err}`);
    }
  };

  const onLike = () => {
    setLike(isLiked ? like - 1 : like + 1);

    try {
      axios
        .post(
          `http://localhost:3000/api/articles/${article.postRef}/like`,
          { isLiked },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .catch(function (err) {
          console.error(`Retour du serveur : ${err}`);
        });
    } catch (err) {
      console.error(`Retour du serveur : ${err}`);
    }

    setIsLiked(!isLiked);
  };

  const onModify = (e) => {
    e.preventDefault();

    let dataArticle = new FormData(e.target);

    axios
      .put(
        `http://localhost:3000/api/articles/${article.postRef}`,
        dataArticle,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setModify(false);
        setOptions(false);
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
      });
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:3000/api/articles/${article.postRef}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
      });
  };

  return (
    <>
      <article className="article-post">
        <div className="article-top">
          <img
            src={
              article.user.profilePicture !== ""
                ? article.user.profilePicture
                : profileImage
            }
            className="user-avatar"
            alt=""
          />
          <div className="post-top-center">
            <span className="user-name">
              {article.user.name} {article.user.lastName}
            </span>
            <div className="articleDate">
              Posté le {article.date.split("T").join(" à ").substring(0, 18)} hs
            </div>
          </div>
          {options !== false ? (
            <div>
              <i
                className="post-options fa-solid fa-ellipsis"
                onClick={() => {
                  setOptions(false);
                }}
              ></i>
              {modify !== false ? (
                <div className="cancel-edit edit-delete">
                  <button
                    onClick={() => {
                      setOptions(false);
                      setModify(false);
                    }}
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <div className="edit-delete">
                  <button
                    onClick={() => {
                      setModify(true);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOptions(false);
                      setConfirmDelete(true);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ) : (
            <i
              className="post-options fa-solid fa-ellipsis"
              onClick={() => {
                setOptions(true);
              }}
            ></i>
          )}

          {confirmDelete !== false ? (
            <div className="edit-delete">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete();
                }}
              >
                Confirmer
              </button>
            </div>
          ) : null}
        </div>
        {modify ? (
          <div className="modify-post-container">
            <form
              className="new-post-form"
              onSubmit={onModify}
              encType="multipart/form-data"
            >
              <div className="modify-post-description">
                <input
                  className="modify-comment"
                  name="description"
                  id="post-description"
                  defaultValue={article.description}
                  aria-label="Ajouter une description"
                  type="text"
                ></input>
              </div>
              {newFile ? (
                <div className="new-img-preview">
                  <img
                    src={URL.createObjectURL(newFile)}
                    className="new-image"
                    alt=""
                  />
                  <button
                    className="cancel-img"
                    onClick={() => setNewFile(null)}
                  >
                    <i className="fa-solid fa-lg fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <>
                  <div className="new-img-preview">
                    <img src={article.imageUrl} className="new-image" alt="" />
                  </div>
                </>
              )}
              <div className="container-bottom modify-post-bottom">
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
                      title="Modifier l'image"
                    ></i>
                  </label>
                  <input
                    id="file"
                    name="image"
                    className="input-image"
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={(e) => {
                      setNewFile(e.target.files[0]);
                    }}
                  ></input>
                  {newFile ? <p className="file-name">{newFile.name}</p> : null}
                </div>
                <button
                  name="post"
                  type="submit"
                  id="post"
                  className="share-post"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h3 className="post-description">{article.description}</h3>
            <img src={article.imageUrl} className="img-post" alt="" />
            <div className="post-icons">
              <div>
                {isLiked ? (
                  <i
                    className="post-liked fa-regular fa-lg fa-thumbs-up"
                    onClick={() => {
                      onLike();
                    }}
                  ></i>
                ) : (
                  <i
                    className="icon fa-regular fa-lg fa-thumbs-up"
                    onClick={() => {
                      onLike();
                    }}
                  ></i>
                )}
                <span className="likes-comments-qty">{like} J'aime</span>
              </div>
              <div>
                <i
                  className="icon fa-regular fa-lg fa-comment"
                  onClick={() => {
                    setComment(true);
                  }}
                ></i>
                <span className="likes-comments-qty">
                  {article.comments.length} Commentaires
                </span>
              </div>
              {/* <i className="fa-regular fa-lg fa-paper-plane"></i> */}
            </div>
            {comment !== false ? (
              <>
                {article.comments.map((comment) => (
                  <div
                    key={comment.userKeyRef + comment.creation}
                    className="comment-container"
                  >
                    <div className="user-info">
                      <img
                        src={
                          comment.userProfilePicture !== ""
                            ? comment.userProfilePicture
                            : profileImage
                        }
                        className="user-avatar"
                        alt=""
                      />
                    </div>
                    <div className="comment">
                      <span className="comment-user-name">
                        {comment.userName} {comment.userLastName}
                      </span>
                      <div className="">
                        <p className="comment-content">{comment.comment}</p>
                      </div>
                    </div>
                    <div>
                      {confirmDeleteComment ? (
                        <>
                          <button
                            className="delete-comment"
                            type="button"
                            onClick={() => {
                              onDeleteComment();
                              setConfirmDeleteComment(false);
                            }}
                          >
                            Supprimer
                          </button>
                          <i
                            className="comment-options fa-solid fa-ellipsis"
                            onClick={() => {
                              setConfirmDeleteComment(false);
                            }}
                          ></i>
                        </>
                      ) : (
                        <i
                          className="comment-options fa-solid fa-ellipsis"
                          onClick={() => {
                            setCommentToDelete(comment);
                            setConfirmDeleteComment(true);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                ))}
                <div className="post-comment">
                  <i className="face-smile fa-regular fa-lg fa-face-smile-beam"></i>
                  <input
                    className="create-comment"
                    placeholder="Ajouter un commentaire..."
                    aria-label="Ajouter un commentaire"
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                  ></input>
                  <div
                    className="arrow-up"
                    name="post"
                    type="submit"
                    id="submit-comment"
                    onClick={onComment}
                  >
                    <i className="fa-solid fa-lg fa-circle-arrow-up"></i>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </article>
    </>
  );
}

export default Article;
