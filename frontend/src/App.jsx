// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from "./pages/Home/Home.jsx";
import User from "./pages/User/User.jsx";
import BookCreatePage from './pages/Book/CreateBook.jsx';

function App() {
  return (
    <>
      {/* Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/book/create" element={<BookCreatePage />} />
      </Routes>
    </>
  )
}

export default App

