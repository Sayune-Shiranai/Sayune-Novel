// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "../src/components/HomePage/HomePage.jsx";
import User from "../src/components/User/User.jsx";
import BookCreatePage from '../src/components/Book/CreateBook.jsx';
import { Component } from "react";

function App() {
  return (
    <>
      {/* Router */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/book/create" element={<BookCreatePage />} />
      </Routes>
    </>
  )
}

export default App

// sửa Component chỉ bao gồm navbar, footer
