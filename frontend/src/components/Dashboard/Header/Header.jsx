import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../../services/AuthService";
import "./Header.css";
import avt from '../../../../../media/avt/jindou-hikari.jpg'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="page-header">
      <div className="header-wrapper row m-0 align-items-center">

        <div className="left-header col-xxl-5 col-xl-6 col-lg-5 col-md-4 col-sm-3 p-0">
            <div>
                <div className="d-flex align-items-center gap-2 ">
                    <h4 className="f-w-600 m-0">Xin chào Sayune</h4>
                </div>
            </div>
            <div className="welcome-content d-xl-block d-none">
                <span className="text-truncate">
                    Chúc bạn hôm nay trúng số con số hôm nay là 14
                </span>
            </div>
        </div>

        <div className="nav-right col-xxl-7 col-xl-6 col-lg-7 col-md-8 col-sm-9 p-0 d-flex justify-content-end">
          <ul className="nav-menus">

            <li>
              <div class="mode" bis_skin_checked="1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon moon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
            </li>

            <li className="profile-nav">
              <div className="profile-media">

                <img
                  src={avt}
                  alt="Avatar"
                />

                <div className="profile-info d-none d-md-block">
                  <span>Sayune</span>
                  <small>Admin</small>
                </div>

                <i className="fa fa-angle-down ms-2"></i>
              </div>

              <ul className="profile-dropdown">
                <li>
                  <Link to="/coming-soon">
                    <i className="fa fa-user"></i>
                    <span>Tài khoản</span>
                  </Link>
                </li>

                <li className="border-bottom-0">
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-out"></i>
                    <span>Đăng xuất</span>
                  </button>
                </li>

              </ul>
            </li>

          </ul>
        </div>

      </div>
    </header>
  );
};

export default Header;
