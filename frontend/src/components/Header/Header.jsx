import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
// import logo from "/vite.svg";

const Header = () => {
  return (
    <div className="page-header">
      <div className="header-wrapper row m-0">

        {/* SEARCH BAR */}
        {/* <form className="form-inline search-full col" action="#" method="get">
          <div className="form-group w-100">
            <div className="Typeahead Typeahead--twitterUsers">
              <div className="u-posRelative">
                <input
                  className="demo-input Typeahead-input form-control-plaintext w-100"
                  type="text"
                  placeholder="Search..."
                />
                <div className="spinner-border Typeahead-spinner" role="status">
                  <span className="sr-only">Đang tải...</span>
                </div>
                <i className="close-search" data-feather="x"></i>
              </div>
              <div className="Typeahead-menu"></div>
            </div>
          </div>
        </form> */}

        {/* LOGO + TOGGLE SIDEBAR */}
        {/* <div className="header-logo-wrapper col-auto p-0">
          <div className="logo-wrapper">
            <Link to="/dashboard">
              <img
                className="img-fluid for-dark"
                src={logo}
                alt="logo-dark"
              />
            </Link>
          </div>

          <div className="toggle-sidebar">
            <i className="status_toggle middle sidebar-toggle" data-feather="align-center"></i>
          </div>
        </div> */}

        {/* LEFT HEADER (Chào user) */}
        <div className="left-header col-xxl-5 col-xl-6 col-lg-5 col-md-4 col-sm-3 p-0">
          <div>
            <a className="toggle-sidebar" href="#">
              <i className="iconly-Category icli"></i>
            </a>

            <div className="d-flex align-items-center gap-2">
              <h4 className="f-w-600">Xin chào Sayune</h4>
              <img className="mt-0" src="" alt="hand-gif" />
            </div>
          </div>

          <div className="welcome-content d-xl-block d-none">
            <span className="text-truncate col-12">
              Chúc bạn hôm nay trúng số – con số hôm nay là 14
            </span>
          </div>
        </div>

        {/* RIGHT HEADER (avatar + dropdown) */}
        <div className="nav-right col-xxl-7 col-xl-6 col-md-7 col-8 pull-right right-header p-0 ms-auto">
          <ul className="nav-menus">

            {/* Dark mode icon */}
            <li>
              <div className="mode">
                <i className="moon" data-feather="moon"></i>
              </div>
            </li>

            {/* Profile dropdown */}
            <li className="profile-nav onhover-dropdown">
              <div className="media profile-media">
                <img
                  className="b-r-10"
                  style={{ width: 41, height: 41 }}
                  src='/media/books_images/Công-chúa-Bạch-long-muốn-biến-tôi-thành-công-chúa-thiên-bạch-ngọc..jpg'
                  alt="avatar"
                />

                <div className="media-body d-xxl-block d-none box-col-none">
                  <div className="d-flex align-items-center gap-2">
                    <span>Sayune</span>
                    <i className="middle fa fa-angle-down"></i>
                  </div>

                  <p className="mb-0 font-roboto">admin</p>
                </div>
              </div>

              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <Link to="/coming-soon">
                    <i data-feather="user"></i>
                    <span>Tài khoản của bạn</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="btn btn-pill btn-outline-primary btn-sm"
                    to="/logout"
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Header;
