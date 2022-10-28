import React from "react";

import "../styles/Feed.css";

import Header from "../components/Header";
import Profile from "../components/Profile";
import CreateArticle from "../components/CreateArticle"
import Article from "../components/Article";
import Footer from "../components/Footer";

import { useState } from "react";
import { useEffect } from "react";

function Feed() { 
  
  const [articles, setArticles] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3000/api/articles/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
      }})
          .then(function (apiArticles) {
            if (apiArticles.ok) {
              return apiArticles.json();
            }
          })
          .then(function (articles) {
            setArticles(
              articles.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
              }));            
          })
          .catch(function (err) {
            console.error(`Retour du serveur : ${err}`); // Show error if necessary
          });
      }, [articles]);
    
    return (<>
        <Header />
        <div className="main-feed">
          <div className="profile-section">
            <Profile />
          </div>
          <div className="feed-section">
            <CreateArticle />
            {articles.map((article) => (
                <Article 
                key={article._id} 
                postRef={article._id}
                description={article.description}
                imageUrl={article.imageUrl}
                date={article.createdAt}
                user={article.user[0]}
                likes={article.likes}
                comments={article.comments}
                />
            ))}
          </div>
        </div>
        <Footer />
    </>)

}

export default Feed;