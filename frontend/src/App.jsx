import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import DashboardLayout from './Layout_dashboard.jsx'

// import Home from "./pages/Home/Home.jsx";
import User from "./pages/User/User.jsx";
import BookCreatePage from './pages/Book/CreateBook.jsx';

import './App.css'


const App = () => {
  return (
      <Routes>        
        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="user" element={<User />} />
          <Route path="book/create" element={<BookCreatePage />} />
        </Route>
        {/* DASHBOARD ENDS*/}

        <Route path="/" element={<Home />} />

      </Routes>
  );
}

export default App
