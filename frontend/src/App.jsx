import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/Auth/AuthLayout.jsx";
import LoginPage from "./pages/Auth/Login/LoginPage.jsx";
import RegisterPage from "./pages/Auth/Register/RegisterPage.jsx";
import DashboardLayout from "./Layout/Dashboard/DashboardLayout.jsx";

import Home from './pages/Home/HomePage.jsx';
import User from "./pages/User/UserPage.jsx";
// import BookCreatePage from "./pages/Book/CreateBook.jsx";

import "./App.css";

const App = () => {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* /dashboard */}
        <Route index element={<User />} />

        {/* /dashboard/user */}
        <Route path="user" element={<User />} />

        {/* /dashboard/book/create */}
        {/* <Route path="book/create" element={<BookCreatePage />} /> */}

      </Route>

    </Routes>
  );
};

export default App;
