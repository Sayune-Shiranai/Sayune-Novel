import React from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import BookCarousel from "../../components/Home/Book/bookCarousel.jsx";
import {getNewBooks, getBooksByCategory} from "../../services/BookService.jsx";
import {getAllCategories} from "../../services/CategoryService.jsx";
import { logout, getProfile } from "../../services/AuthService.jsx";
// import avt from '/home/dunglaplanh/www/dự án/BTNHOM-git/Sayune-Novel/media/avt/jindou-hikari.jpg'
import "./HomePage.css";

{/* Giả lập dữ liệu sách */}
const booksData = {
  newUpdates: [
    {
      id: 1,
      book_number: 1001,
      title: "Chúa Tể Bóng Tối",
      another_name: "The Eminence in Shadow",
      slug: "chua-te-bong-toi",
      img: "https://i.pinimg.com/564x/d8/d9/15/d8d915474320295da9489565575796b3.jpg",
      author_id: 1,
      artist_id: 1,
      status: 1, // ID của bảng Status
      description: "Câu chuyện về một chàng trai muốn trở thành kẻ đứng sau giật dây...",
      user_id: 101,
      trangthai: 1, // ID của bảng ModerationStatus
      createdAt: "2023-10-20T00:00:00.000Z",
      updatedAt: "2023-10-25T00:00:00.000Z",
      // Giả lập dữ liệu quan hệ (Join tables)
      Book_Author: { name: "Daisuke Aizawa" },
      Book_Status: { status_name: "Đang tiến hành" },
      // API thường trả về trường ảo này
      chapter: 150 
    },
    {
      id: 2,
      book_number: 1002,
      title: "Thợ Săn Hạng S",
      another_name: "S-Class Hunter",
      slug: "tho-san-hang-s",
      img: "https://i.pinimg.com/564x/4d/0e/41/4d0e4125b28d6849df3b6833989c9225.jpg",
      author_id: 2,
      artist_id: 2,
      status: 1,
      description: "Hầm ngục xuất hiện và các thợ săn trỗi dậy...",
      user_id: 102,
      trangthai: 1,
      createdAt: "2023-09-15T00:00:00.000Z",
      updatedAt: "2023-10-24T00:00:00.000Z",
      Book_Author: { name: "Geun-seo" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 89
    },
    {
      id: 3,
      book_number: 1003,
      title: "Toàn Trí Độc Giả",
      another_name: "Omniscient Reader's Viewpoint",
      slug: "toan-tri-doc-gia",
      img: "https://i.pinimg.com/736x/82/38/55/823855a840e69458999a07153d106190.jpg",
      author_id: 3,
      artist_id: 3,
      status: 1,
      description: "Chỉ một mình tôi biết kết thúc của thế giới này...",
      user_id: 103,
      trangthai: 1,
      createdAt: "2023-08-10T00:00:00.000Z",
      updatedAt: "2023-10-23T00:00:00.000Z",
      Book_Author: { name: "Sing Shong" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 551
    },
    {
      id: 4,
      book_number: 1004,
      title: "Kiếm Sĩ Diệt Quỷ",
      another_name: "Kimetsu no Yaiba",
      slug: "kiem-si-diet-quy",
      img: "https://i.pinimg.com/564x/44/09/bd/4409bd3c959772c9183cb3033503ce3e.jpg",
      author_id: 4,
      artist_id: 4,
      status: 2, // Đã hoàn thành
      description: "Hành trình diệt quỷ cứu em gái...",
      user_id: 104,
      trangthai: 1,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-05-20T00:00:00.000Z",
      Book_Author: { name: "Gotouge Koyoharu" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: 205
    },
    {
      id: 5,
      book_number: 1005,
      title: "Gia Đình Điệp Viên",
      another_name: "Spy x Family",
      slug: "spy-x-family",
      img: "https://i.pinimg.com/564x/bd/28/76/bd28765360986161491761664f33b145.jpg",
      author_id: 5,
      artist_id: 5,
      status: 1,
      description: "Điệp viên, sát thủ và nhà ngoại cảm...",
      user_id: 105,
      trangthai: 1,
      createdAt: "2023-06-12T00:00:00.000Z",
      updatedAt: "2023-10-22T00:00:00.000Z",
      Book_Author: { name: "Tatsuya Endo" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 78
    }
  ],

  mystery: [
    {
      id: 6,
      book_number: 2001,
      title: "Thám Tử Conan",
      another_name: "Detective Conan",
      slug: "tham-tu-conan",
      img: "https://i.pinimg.com/564x/72/7a/e9/727ae967a5b399120689b78809c95b45.jpg",
      author_id: 6,
      artist_id: 6,
      status: 1,
      description: "Cơ thể bị teo nhỏ nhưng trí tuệ vẫn nguyên vẹn...",
      user_id: 106,
      trangthai: 1,
      createdAt: "2023-02-15T00:00:00.000Z",
      updatedAt: "2023-10-25T00:00:00.000Z",
      Book_Author: { name: "Gosho Aoyama" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 1100
    },
    {
      id: 7,
      book_number: 2002,
      title: "Hồ Sơ Chết Chóc",
      another_name: "Deadly Files",
      slug: "ho-so-chet-choc",
      img: "https://i.pinimg.com/564x/52/63/82/526382903a89d70094939b4f997c4581.jpg",
      author_id: 7,
      artist_id: null,
      status: 1,
      description: "Những vụ án bí ẩn chưa có lời giải...",
      user_id: 107,
      trangthai: 1,
      createdAt: "2023-07-20T00:00:00.000Z",
      updatedAt: "2023-10-20T00:00:00.000Z",
      Book_Author: { name: "Truong Le" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 45
    },
    {
      id: 8,
      book_number: 2003,
      title: "Sherlock Holmes",
      another_name: null,
      slug: "sherlock-holmes",
      img: "https://i.pinimg.com/564x/1e/8a/34/1e8a34da47833a699c264253303c2006.jpg",
      author_id: 8,
      artist_id: null,
      status: 2,
      description: "Thám tử đại tài phố Baker...",
      user_id: 108,
      trangthai: 1,
      createdAt: "2022-01-10T00:00:00.000Z",
      updatedAt: "2022-12-30T00:00:00.000Z",
      Book_Author: { name: "Arthur Conan Doyle" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: "Full"
    },
    {
      id: 9,
      book_number: 2004,
      title: "Kẻ Nhìn Thấy Mùi Hương",
      another_name: "The Girl Who Sees Smells",
      slug: "ke-nhin-thay-mui-huong",
      img: "https://i.pinimg.com/564x/a4/0c/36/a40c36146c2438858175217997576a0a.jpg",
      author_id: 9,
      artist_id: 9,
      status: 2,
      description: "Cô gái có khả năng nhìn thấy mùi hương bằng mắt...",
      user_id: 109,
      trangthai: 1,
      createdAt: "2023-03-12T00:00:00.000Z",
      updatedAt: "2023-09-15T00:00:00.000Z",
      Book_Author: { name: "Man Chwi" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: 60
    },
    {
      id: 14,
      book_number: 2005,
      title: "Bí Ẩn Ánh Trăng",
      another_name: "Moonlight Mystery",
      slug: "bi-an-anh-trang",
      img: "https://i.pinimg.com/564x/ed/7a/1e/ed7a1e2f3f5f4f0f4e3e3b8e2c1f4a5b.jpg",
      author_id: 10,
      artist_id: null,
      status: 1,
      description: "Bí ẩn đằng sau ánh trăng đêm rằm...",
      user_id: 110,
      trangthai: 1,
      createdAt: "2023-08-05T00:00:00.000Z",
      updatedAt: "2023-10-25T00:00:00.000Z",
      Book_Author: { name: "Dark Night" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 32
    }
  ],

  romance: [
    {
      id: 10,
      book_number: 3001,
      title: "Hóa Ra Anh Vẫn Ở Đây",
      another_name: "Never Gone",
      slug: "hoa-ra-anh-van-o-day",
      img: "https://i.pinimg.com/564x/d1/29/73/d12973950222f7300c7e296213715694.jpg",
      author_id: 11,
      artist_id: null,
      status: 2,
      description: "Câu chuyện tình yêu tuổi thanh xuân...",
      user_id: 111,
      trangthai: 1,
      createdAt: "2021-05-20T00:00:00.000Z",
      updatedAt: "2022-01-10T00:00:00.000Z",
      Book_Author: { name: "Tân Di Ổ" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: "Full"
    },
    {
      id: 11,
      book_number: 3002,
      title: "Yêu Em Từ Cái Nhìn Đầu Tiên",
      another_name: "Love O2O",
      slug: "yeu-em-tu-cai-nhin-dau-tien",
      img: "https://i.pinimg.com/564x/42/1d/19/421d19114b096f243026217462438510.jpg",
      author_id: 12,
      artist_id: null,
      status: 2,
      description: "Chuyện tình từ trong game ra ngoài đời thực...",
      user_id: 112,
      trangthai: 1,
      createdAt: "2020-10-10T00:00:00.000Z",
      updatedAt: "2021-02-14T00:00:00.000Z",
      Book_Author: { name: "Cố Mạn" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: "Full"
    },
    {
      id: 12,
      book_number: 3003,
      title: "Cô Vợ Hợp Đồng",
      another_name: "Contract Wife",
      slug: "co-vo-hop-dong",
      img: "https://i.pinimg.com/564x/23/bd/ea/23bdea07f6144e548677761099688461.jpg",
      author_id: 13,
      artist_id: null,
      status: 1,
      description: "Hợp đồng hôn nhân đầy trắc trở...",
      user_id: 113,
      trangthai: 1,
      createdAt: "2023-04-01T00:00:00.000Z",
      updatedAt: "2023-10-24T00:00:00.000Z",
      Book_Author: { name: "Linh Lan" },
      Book_Status: { status_name: "Đang tiến hành" },
      chapter: 120
    },
    {
      id: 13,
      book_number: 3004,
      title: "Mãi Mãi Là Bao Xa",
      another_name: null,
      slug: "mai-mai-la-bao-xa",
      img: "https://i.pinimg.com/564x/a2/82/8e/a2828e5359a6868661642838703714b6.jpg",
      author_id: 14,
      artist_id: null,
      status: 2,
      description: "Chuyện tình thầy trò đầy lãng mạn...",
      user_id: 114,
      trangthai: 1,
      createdAt: "2022-09-09T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      Book_Author: { name: "Diệp Lạc Vô Tâm" },
      Book_Status: { status_name: "Đã hoàn thành" },
      chapter: "Full"
    }
  ]
};
const sidebarData = {
  isLoggedIn: false,
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
const categoriesMock = [
  { id: 1, category: "Action" },
  { id: 2, category: "Adventure" },
  { id: 3, category: "Comedy" },
  { id: 4, category: "Drama" },
  { id: 5, category: "Fantasy" },
  { id: 6, category: "Harem" },
  { id: 7, category: "Horror" },
  { id: 8, category: "Mystery" },
  { id: 9, category: "Romance" },
  { id: 10, category: "School Life" },
];
{/* Giả lập dữ liệu sách */}
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Home = () => {
  const [newBooks, setNewBooks] = useState(booksData.newUpdates);
  const [categories, setCategories] = useState(categoriesMock);
  const [mysteryBooks, setMysteryBooks] = useState(booksData.mystery);
  const [romanceBooks, setRomanceBooks] = useState(booksData.romance);
  
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  {/*có API thì xóa mẹ nó đi, gỡ phần bên dưới ra để dùng*/}
  const [user, setUser] = useState(
  //   { 
  //   // username: "Wibu LỌ",
  //   // User_Role: { role: "user" } 
  // }
);
  
  
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const Profile = async () => {
  //     try {
  //       const res = await getProfile();
  //       setUser(res.user);
  //     } catch (err) {
  //       console.error(err);
  //       setUser(null);
  //     }
  //   };

  //   Profile();
  // }, []);
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Lấy Categories
        // const catData = await getAllCategories();
        // setCategories(catData); // Khi nào có API thì bỏ comment

        // 2. Lấy sách (Tạm thời đang dùng mock data ở useState trên)
        // const newB = await getNewBooks();
        // const mystB = await getBooksByCategory(8); // Ví dụ ID 8 là Mystery
        // const romB = await getBooksByCategory(9);  // Ví dụ ID 9 là Romance

        // setNewBooks(newB);
        // setMysteryBooks(mystB);
        // setRomanceBooks(romB);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchAllData();
  }, []);
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">
          {/* Thay src bằng link logo */}
          <Link to="/">
            <img src="https://ui-avatars.com/api/?name=Logo&background=random" alt="Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to ="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Trang Chủ</Link>
          </li>
          
          <li 
            className="nav-item" 
            onClick={() => setCategoryOpen(!isCategoryOpen)}
          >
            Thể loại ▼
            <ul className={`dropdown-menu ${isCategoryOpen ? 'open' : ''}`}>
              {/* SỬA: Mapping theo model Category (cat.id và cat.category) */}
              {categories.map((cat) => (
                <li key={cat.id} className="dropdown-item">
                   <Link to={`/the-loai/${cat.id}`} style={{color: 'inherit', textDecoration: 'none', display: 'block'}}>
                      {cat.category}
                   </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="nav-item">Tìm truyện</li>
          <li className="nav-item">Theo dõi</li>
          <li className="nav-item">Lịch sử</li>
          <li className="nav-item">Light Novel</li>
          <li className="nav-item">Hướng dẫn ▼</li>
        </ul>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="search-container">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon />
            </div>

            {searchTerm.toLowerCase().includes('du') && (
              <div className="search-results">
                <div className="result-item">
                  <img src="https://upload.wikimedia.org/wikipedia/en/2/22/DanMachi_light_novel_volume_1_cover.jpg" alt="cover" />
                  <div className="result-info">
                    <h4>Dungeon Ni Deai O Motomeru...</h4>
                    <span>Chương 185 - Đang cập nhật</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

          {user ? (
            <div className="profile-nav">
              <div className="profile-media">

                <img
                  src={avt}
                  alt="Avatar"
                />
      
                <div className="profile-info d-none d-md-block">
                  <span>{user?.username}</span>
                  <small>{user?.User_Role.role}</small>
                </div>

                <i className="fa fa-angle-down ms-2"></i>
              </div>

             <ul className="profile-dropdown">
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
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-out"></i>
                    <span>Đăng xuất</span>
                  </button>
                </li>

              </ul>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/login" className="profile-btn">Đăng nhập</Link>
              <span className="divider">|</span>
              <Link to="/register" className="profile-btn">Đăng ký</Link>
            </div>
          )}
          
        </div>
        </div>
      </header>

      <div className="banner-container">
        <img 
          src="https://images4.alphacoders.com/936/936378.jpg" 
          alt="Banner Anime" 
          className="banner-img"
        />
      </div>
    
      <div className="content-container">
        <div className="main-content">
          <BookCarousel title=" Truyện Mới Cập Nhật" books={newBooks} />
          
          <hr className="section-divider" />
          
          <BookCarousel title=" Thể Loại: Trinh Thám" books={mysteryBooks} />
          <BookCarousel title=" Thể Loại: Ngôn Tình" books={romanceBooks} />
        </div>
        
        <aside className="sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title"> Thông báo Diễn Đàn</h3>
            <div className="widget-content">
              <ul className="forum-list">
                  <li> Sự kiện bình chọn sách hay </li>
                  <li> Bảo trì server lúc 0h</li>
              </ul>
            </div>
          </div>
          <div className="sidebar-widget">
            <h3 className="widget-title"> Tủ sách của bạn</h3>
            <div className="widget-content">
              {sidebarData.isLoggedIn ? (
                <ul className="followed-list">
                  {sidebarData.followedBooks.map(book => (
                    <li key={book.id} className="followed-item">
                      <span className="followed-title">{book.title}</span>
                      <span className="followed-chap">C.{book.chapter}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">Bạn chưa đăng nhập. <br/> Đăng nhập để xem tủ sách!</p>
              )}
            </div>
          </div>
          <div className="sidebar-widget">
            <h3 className="widget-title"> Bình Luận</h3>
            <div className="widget-content">
              <ul className="comment-list">
                {sidebarData.comments.map((cmt, idx) => (
                  <li key={idx} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-user">{cmt.user}</span>
                      <span className="comment-time">{cmt.time}</span>
                    </div>
                    <p className="comment-text">{cmt.content}</p>
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
