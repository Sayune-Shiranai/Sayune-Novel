// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "../components/HomePage/HomePage.jsx";
import User from "../components/User/User.jsx";
import BookCreatePage from '../components/Book/CreateBook.jsx';

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
