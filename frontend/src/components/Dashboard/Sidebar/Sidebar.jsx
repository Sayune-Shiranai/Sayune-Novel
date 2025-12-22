import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"
import logo from '../../../../../media/logo/logo-dark.png'

const Sidebar = () => {
  return (
    <aside className="sidebar-wrapper">
      <div className="logo-wrapper">
        <Link to="/dashboard">
          <img className="logo-dark" src={logo} alt="logo-dark" />
        </Link>
        {/* <div className="back-btn"><i className="fa fa-angle-left"></i></div> */}
      </div>

      <div className="toggle-sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </div>
      {/* <div className="logo-icon-wrapper">
        <Link to="/dashboard">
          <img className="img-fluid" src="/202404/images/logobe.png" alt="" />
        </Link>
      </div> */}

      {/* Sidebar menu */}
      <nav className="sidebar-main">
        <div className="left-arrow" id="left-arrow">
          <i data-feather="arrow-left"></i>
        </div>

        <div id="sidebar-menu">
          <ul className="sidebar-links" id="simple-bar">

            {/* Back button mobile */}
            {/* <li className="back-btn">
              <Link to="/dashboard">
                <img className="img-fluid" src="/202404/images/logo.png" alt="" />
              </Link>

              <div className="mobile-back text-end">
                <span>Back</span>
                <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
              </div>
            </li> */}

            {/* Pinned
            <li className="pin-title sidebar-main-title">
              <div><h6>Pinned</h6></div>
            </li> */}


            {/* QUẢN LÝ HỆ THỐNG */}
            <li className="sidebar-main-title">
              <div><h6 className="m-0">Quản lý hệ thống</h6></div>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title link-nav" to="/dashboard">
                <i className="fa fa-home"></i>
                <span className="ms-2">Dashboard</span>
              </Link>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title" to="#">
                <i className="fa fa-user"></i>
                <span className="ms-2">Người dùng</span>
              </Link>

              <ul className="sidebar-submenu">
                <li><Link to="/users/list">Danh sách người dùng</Link></li>
                <li><Link to="/users/create">Thêm người dùng</Link></li>
              </ul>
            </li>

            {/* QUẢN LÝ TRUYỆN */}
            <li className="sidebar-main-title">
              <div><h6 className="m-0">Quản lý truyện</h6></div>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title link-nav" to="/books">
                <i className="fa fa-book"></i>
                <span className="ms-2">Danh sách truyện</span>
              </Link>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title link-nav" to="/books/create">
                <i className="fa fa-plus-circle"></i>
                <span className="ms-2">Thêm truyện</span>
              </Link>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title" to="#">
                <i className="fa fa-list"></i>
                <span className="ms-2">Quản lý chương</span>
              </Link>

              <ul className="sidebar-submenu">
                <li><Link to="/chapters">Danh sách chương</Link></li>
                <li><Link to="/chapters/create">Thêm chương</Link></li>
              </ul>
            </li>

            {/* CÀI ĐẶT */}
            <li className="sidebar-main-title">
              <div><h6 className="m-0">Cài đặt</h6></div>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title link-nav" to="/settings/system">
                <i className="fa fa-cog"></i>
                <span className="ms-2">Cấu hình hệ thống</span>
              </Link>
            </li>

            <li className="sidebar-list">
              <Link className="sidebar-link sidebar-title link-nav" to="/settings/profile">
                <i className="fa fa-id-card"></i>
                <span className="ms-2">Thông tin tài khoản</span>
              </Link>
            </li>
          </ul>

          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
