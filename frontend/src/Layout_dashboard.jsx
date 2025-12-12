import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer';

const DashboardLayout = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="page-body-wrapper">
        <Sidebar />
        <div className="page-body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout
