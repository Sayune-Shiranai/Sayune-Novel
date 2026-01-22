import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./Layout/Auth/AuthLayout.jsx";
import LoginPage from "./pages/Auth/Login/LoginPage.jsx";
import RegisterPage from "./pages/Auth/Register/RegisterPage.jsx";
import DashboardLayout from "./Layout/Dashboard/DashboardLayout.jsx";
import { AuthorityRoute } from './Middleware/Routes/AuthorityRoute.jsx'

import HomePage from './pages/Home/HomePage.jsx';
import UserProfile from"./pages/User/UserProfile/UserProfile.jsx";
import BookDetail from './pages/Book/BookDetail/BookDetail.jsx'
import UserPage from "./pages/User/UserPage.jsx";
import UpdateUserPage from "./pages/User/UpdateUser/UpdateUserPage.jsx";
import BookPage from "./pages/Book/BookPage.jsx";
import CreateBookPage from "./pages/Book/CreateBook/CreateBookPage.jsx";
import UpdateBookPage from "./pages/Book/UpdateBook/UpdateBookPage.jsx";
import VolumePage from "./pages/Volume/VolumePage.jsx";
import CreateVolumePage from "./pages/Volume/CreateVolume/CreateVolumePage.jsx";
import CategoryPage from "./pages/Category/CategoryPage.jsx";
import CreateCategoryPage from "./pages/Category/CreateCategory/CreateCategoryPage.jsx";
import AuthorPage from "./pages/Author/AuthorPage.jsx";
import CreateAuthorPage from "./pages/Author/CreateAuthor/CreateAuthorPage.jsx";
import ArtistPage from "./pages/Artist/ArtistPage.jsx";
import CreateArtistPage from "./pages/Artist/CreateArtist/CreateArtistPage.jsx";
import RolePage from "./pages/Role/RolePage.jsx";
import CreateRolePage from "./pages/Role/CreateRole/CreateRolePage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import BookFollowPage from "./pages/BookFollow/BookFollowPage.jsx";
import UserFollowBoookPage from "./pages/BookFollow/UserFollowBook/UserFollowBookPage.jsx"
import FollowedBookPage from "./pages/FollowedBook/FollowedBook.jsx";
// import BookCreatePage from "./pages/Book/CreateBook.jsx";

import "./App.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />
        <Route path="/truyen/:slug" element={<BookDetail />} />
        <Route path="/profile" element={<UserProfile />} />        
        <Route path="/tusach" element={<FollowedBookPage />} />
        

        {/* DASHBOARD */}
        <Route path="/dashboard" element={
          <AuthorityRoute roles={["Admin", "Uploader", "Mod"]}>
            <DashboardLayout />
          </AuthorityRoute>
        }>

          <Route index element={<BookPage />} />

          <Route path="user" element={<UserPage />} />

          <Route path="user/update/:id" element={<UpdateUserPage />} />

          <Route path="book" element={<BookPage />} />

          <Route path="book/create" element={<CreateBookPage />} />

          <Route path="book/update/:slug" element={<UpdateBookPage />} />

          <Route path="book/:slug/volume" element={<VolumePage/>} />

          <Route path="book/:slug/volume/create" element={<CreateVolumePage/>} />

          <Route path="category" element={<CategoryPage />} />

          <Route path="category/create" element={<CreateCategoryPage />} />

          <Route path="author" element={<AuthorPage />} />

          <Route path="author/create" element={<CreateAuthorPage />} />

          <Route path="artist" element={<ArtistPage />} />

          <Route path="artist/create" element={<CreateArtistPage />} />

          <Route path="role" element={<RolePage />} />

          <Route path="role/create" element={<CreateRolePage />} />

          <Route path="bookfollowing" element={<BookFollowPage />} />

          <Route path="bookfollowing/:slug" element={<UserFollowBoookPage />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </>
  );
};

export default App;
