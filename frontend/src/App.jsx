// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "../components/HomePage/HomePage.jsx";
import UserPage from "../components/UserPage/UserPage.jsx";

function App() {
  return (
    <>
      {/* Router */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/user" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
