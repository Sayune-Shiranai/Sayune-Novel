import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { getNewBooks, getBooksByCategory } from "../../services/BookService.jsx";
import { getAllCategories } from "../../services/CategoryService.jsx";
import { getProfile, logout} from "../../services/AuthService.jsx"
import {getFollowBookbyUser} from "../../services/FollowBookService.jsx";
import BookCarousel from "../../components/Home/Book/bookCarousel.jsx";
import avt from '../../../../media/avt/jindou-hikari.jpg'; 
import "./HomePage.css";

const sidebarData = {
  followedBooks: [
    { id: 1, title: "Chúa Tể Bóng Tối", chapter: 152 },
    { id: 2, title: "Thợ Săn Hạng S", chapter: 90 },
  ],
  comments: [
    { user: "Huy Gamer", content: "Truyện này cuốn quá ad ơi!", time: "2 phút trước" },
    { user: "Lan Ngọc", content: "Chương 150 bị lỗi ảnh nha.", time: "15 phút trước" },
    { user: "Minh Béo", content: "Main bá đạo thật sự.", time: "1 giờ trước" },
    { user: "Shadow", content: "Bao giờ ra chap mới vậy?", time: "2 giờ trước" },
  ]
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Home = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [newBooks, setNewBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mysteryBooks, setMysteryBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [followedBooks, setFollowedBooks] = useState([]);
  
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      }
      catch (err) {
        console.error("Lỗi lấy thông tin người dùng:", err);
      }};
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchFollowedBooks = async () => {
      if (user) {
        try { 
          const followed = await getFollowBookbyUser(user.id);
          setFollowedBooks(followed || []); 
        }
        catch (err) {
          console.error("Lỗi lấy sách theo dõi:", err);
        }
      };
    fetchFollowedBooks();
  }}, [user]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [
            newBooksRes, 
            categoriesRes, 
            mysteryRes, 
            romanceRes
        ] = await Promise.all([
            getNewBooks(),              // Lấy sách mới
            getAllCategories(),         // Lấy danh sách thể loại
            getBooksByCategory(1),      // Lấy sách Trinh thám (Giả sử ID=1, check DB đổi lại thành của mih)
            getBooksByCategory(2)       // Lấy sách Ngôn tình (Giả sử ID=2, check DB đổi lại thành của mih)
        ]);
        setNewBooks(newBooksRes || []);
        setCategories(categoriesRes || []);
        setMysteryBooks(mysteryRes || []);
        setRomanceBooks(romanceRes || []);

      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="home-page-wrapper">
      <header className="home-navbar">
        <div className="home-logo">
          <Link to="/">
            <img src="https://ui-avatars.com/api/?name=Logo&background=random" alt="Logo" />
          </Link>
        </div>

        <ul className="home-nav-links">
          <li className="home-nav-item">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Trang Chủ</Link>
          </li>
          
          <li 
            className="home-nav-item" 
            onClick={() => setCategoryOpen(!isCategoryOpen)}
          >
            Thể loại ▼
            <ul className={`home-dropdown-menu ${isCategoryOpen ? 'open' : ''}`}>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id} className="home-dropdown-item">
                     <Link to={`/the-loai/${cat.id}`} style={{color: 'inherit', textDecoration: 'none', display: 'block'}}>
                        {cat.category}
                     </Link>
                  </li>
                ))
              ) : (
                <li className="home-dropdown-item">Đang tải...</li>
              )}
            </ul>
          </li>

          <li className="home-nav-item">Tìm truyện</li>
          <li className="home-nav-item">Theo dõi</li>
          <li className="home-nav-item">Lịch sử</li>
          <li className="home-nav-item">Light Novel</li>
          <li className="home-nav-item">Hướng dẫn ▼</li>
        </ul>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          
          {/* SEARCH BOX */}
          <div className="home-search-container">
            <div className="home-search-box">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon />
            </div>

            {searchTerm.toLowerCase().includes('du') && (
              <div className="home-search-results">
                <div className="home-result-item">
                  <img src="https://upload.wikimedia.org/wikipedia/en/2/22/DanMachi_light_novel_volume_1_cover.jpg" alt="cover" />
                  <div className="home-result-info">
                    <h4>Dungeon Ni Deai O Motomeru...</h4>
                    <span>Chương 185 - Đang cập nhật</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {user ? (
              <div className="home-profile-nav">
                <div className="home-profile-media">
                  <img
                    src={user.img_avatar || avt}
                    alt="Avatar"
                  />
                  <div className="home-profile-info d-none d-md-block">
                    <span>{user.username}</span>
                    <small>{user.User_Role?.role || "Thành viên"}</small>
                  </div>
                  <i className="fa fa-angle-down ms-2 text-white"></i>
                </div>

                <ul className="home-profile-dropdown">
                  <li>
                    <Link to="/profile">
                      <i className="fa fa-user"></i>
                      <span>Tài khoản</span>
                    </Link>
                  </li>
                  <li className="border-bottom-0">
                    <button
                      type="button"
                      className="logout-btn"
                      onClick={handleLogoutClick}
                    >
                      <i className="fa fa-sign-out"></i>
                      <span>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="home-auth-actions">
                <Link to="/login" className="home-profile-btn">Đăng nhập</Link>
                <span className="home-divider">|</span>
                <Link to="/register" className="home-profile-btn">Đăng ký</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- BANNER --- */}
      <div className="home-banner-container">
        <img 
          src="https://images4.alphacoders.com/936/936378.jpg" 
          alt="Banner Anime" 
          className="home-banner-img"
        />
      </div>
      <div className="home-content-container">
        <div className="home-main-content">
          {isLoading ? (
             <div style={{textAlign: 'center', padding: '50px', color: '#666'}}>Đang tải danh sách truyện...</div>
          ) : (
            <>
              <BookCarousel title="⚡ Truyện Mới Cập Nhật" books={newBooks} />
              
              <hr className="home-section-divider" />
              
              <BookCarousel title="🔍 Thể Loại: Trinh Thám" books={mysteryBooks} />
              <BookCarousel title="💖 Thể Loại: Ngôn Tình" books={romanceBooks} />
            </>
          )}
        </div>
      
        <aside className="home-sidebar">
          
          <div className="home-sidebar-widget">
            <h3 className="home-widget-title"> Thông báo Diễn Đàn</h3>
            <div className="home-widget-content">
              <ul className="home-forum-list">
                  <li> Sự kiện bình chọn sách hay </li>
                  <li> Bảo trì server lúc 0h</li>
              </ul>
            </div>
          </div>

          <div className="home-sidebar-widget">
            <h3 className="home-widget-title">
              <Link to="/tusach" className="home-widget-link"> 
              Tủ sách của tôi 
              </Link>
            </h3> 
            <div className="home-widget-content">
              {user ? (
                <ul className="home-followed-list">
                  {followedBooks.map(book => (
                    <li key={book.id} className="home-followed-item">
                      <span className="home-followed-title">{book.title}</span>
                      <span className="home-followed-chap">C.{book.chapter}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="home-empty-state">Bạn chưa đăng nhập. <br/> Đăng nhập để xem tủ sách!</p>
              )}
            </div>
          </div>

          <div className="home-sidebar-widget">
            <h3 className="home-widget-title"> Bình Luận</h3>
            <div className="home-widget-content">
              <ul className="home-comment-list">
                {sidebarData.comments.map((cmt, idx) => (
                  <li key={idx} className="home-comment-item">
                    <div className="home-comment-header">
                      <span className="home-comment-user">{cmt.user}</span>
                      <span className="home-comment-time">{cmt.time}</span>
                    </div>
                    <p className="home-comment-text">{cmt.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Home;