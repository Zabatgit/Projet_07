import React from "react";

import Header from "../components/Header";
import ProfileOptions from "../components/ProfileOptions";
import Footer from "../components/Footer";

import "../styles/Profile.css";

function UserProfile() {

    return (<>
        <Header />
        <div className="profile-page-container">
            <div className="user-profile-container">
                <ProfileOptions />
            </div>         
        </div>
        <Footer />
    </>);
}

export default UserProfile;