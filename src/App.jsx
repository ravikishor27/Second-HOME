import {BrowserRouter,Routes,Route} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/SignIn" element={<Signin/>}/>
        <Route path="/SignUp" element={<Signup/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

