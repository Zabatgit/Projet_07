import React from "react";
import "../styles/Profile.css";
import coverImage from "../assets/teamwork-groupomania.webp";
import profileImage from "../assets/user-avatar.webp";

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function Profile() {
  return (
    <>
      <div className="profile-container">
        <div className="cover-container">
          <img
            className="cover-image"
            src={
              currentUser.coverPicture !== ""
                ? currentUser.coverPicture
                : coverImage
            }
            alt=""
          />
        </div>
        <div className="user-info-container">
          <img
            className="profile-image"
            src={
              currentUser.profilePicture !== ""
                ? currentUser.profilePicture
                : profileImage
            }
            alt=""
          />
          <h3 className="profile-name">
            {currentUser.name} {currentUser.lastName}
          </h3>
          <span className="user-position">{currentUser.position}</span>
        </div>
      </div>
    </>
  );
}

export default Profile;
