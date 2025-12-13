import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layout_dashboard.jsx";

import Home from './pages/Home/Home';
import User from "./pages/User/User";
// import BookCreatePage from "./pages/Book/CreateBook.jsx";

import "./App.css";

const App = () => {
  return (
    <Routes>

      {/* PUBLIC */}
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
