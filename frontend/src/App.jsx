import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/Auth/AuthLayout.jsx";
import LoginPage from "./pages/Auth/Login/LoginPage.jsx";
import RegisterPage from "./pages/Auth/Register/RegisterPage.jsx";
import DashboardLayout from "./Layout/Dashboard/DashboardLayout.jsx";

import HomePage from './pages/Home/HomePage.jsx';
import UserPage from "./pages/User/UserPage.jsx";
import UpdateUserPage from "./pages/User/UpdateUser/UpdateUserPage.jsx";
import BookPage from "./pages/Book/BookPage.jsx";
import CreateBookPage from "./pages/Book/CreateBook/CreateBookPage.jsx";
import VolumePage from "./pages/Volume/VolumePage.jsx";
import CreateVolumePage from "./pages/Volume/CreateVolume/CreateVolumePage.jsx";
import AuthorPage from "./pages/Author/AuthorPage.jsx";
import CreateAuthorPage from "./pages/Author/CreateAuthor/CreateAuthorPage.jsx";
import ArtistPage from "./pages/Artist/ArtistPage.jsx";
import CreateArtistPage from "./pages/Artist/CreateArtist/CreateArtistPage.jsx";
import RolePage from "./pages/Role/RolePage.jsx";
import CreateRolePage from "./pages/Role/CreateRole/CreateRolePage.jsx";
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
      <Route path="/" element={<HomePage />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* /dashboard */}
        <Route index element={<BookPage />} />

        {/* /dashboard/user */}
        <Route path="user" element={<UserPage />} />
        {/* /dashboard/user/update/:id */}
        <Route path="user/update/:id" element={<UpdateUserPage />} />

        <Route path="book" element={<BookPage />} />

        <Route path="book/create" element={<CreateBookPage />} />

        <Route path="book/:slug/volume" element={<VolumePage/>} />

        <Route path="book/:slug/volume/create" element={<CreateVolumePage/>} />

        <Route path="author" element={<AuthorPage />} />

        <Route path="author/create" element={<CreateAuthorPage />} />

        <Route path="artist" element={<ArtistPage />} />

        <Route path="artist/create" element={<CreateArtistPage />} />

        <Route path="role" element={<RolePage />} />

        <Route path="role/create" element={<CreateRolePage />} />


      </Route>

    </Routes>
  );
};

export default App;
