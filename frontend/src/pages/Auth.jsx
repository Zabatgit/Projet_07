import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Feed from "../pages/Feed";
import PrivateRoutes from "../components/PrivateRoutes";
import Profile from "../pages/Profile";


function Auth() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default Auth;
