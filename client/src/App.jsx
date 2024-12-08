import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateLisiting from "./pages/CreateLisiting";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

///:listingId

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<Signin />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateLisiting/>}/>
          <Route path="/update-listing/:listingId" element ={<UpdateListing/>}/>
          <Route path='/listing' element={<Listing />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
