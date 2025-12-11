import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer';

// import Home from "./pages/Home/Home.jsx";
// import User from "./pages/User/User.jsx";
// import BookCreatePage from './pages/Book/CreateBook.jsx';

import './App.css'


const App = () => {
  // return (
  //   <>
  //     {/* Router */}
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/dashboard/user" element={<User />} />
  //       <Route path="/dashboard/book/create" element={<BookCreatePage />} />
  //     </Routes>
  //   </>
  // )
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      {/* Loader */}
      <div className="loader-wrapper">
        <div className="loader">
          <div className="loader4"></div>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Body */}
      <div className="page-body-wrapper">
        <Sidebar />

        <div className="page-body">
          <h2>Nội dung chính</h2>
          <p>Đây là phần RenderBody() trong Razor — nhưng React quản lý bằng component/page.</p>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App
