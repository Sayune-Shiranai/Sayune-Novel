import React from 'react'
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
        <h1>Dashboard Page Body wrapper</h1>
        <div className="page-body">
          <h1>Dashboard Page Body</h1>
          {/* <Outlet /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout
