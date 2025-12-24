import React from 'react'
import { Outlet } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from '../../components/Dashboard/Header/Header';
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar'
import Footer from '../../components/Dashboard/Footer/Footer';
import './DashboardLayout.css'

const DashboardLayout = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="page-body-wrapper">
        <Sidebar />
        {/* <h1>Dashboard Page Body wrapper</h1> */}
        <div className="page-body">
          {/* <h1>Dashboard Page Body</h1> */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout
