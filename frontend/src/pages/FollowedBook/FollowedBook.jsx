import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookItem from "../../components/BookItem/BookItem.jsx";

 import { GetMyFollowedBooks } from "../../services/BookFollowService.jsx";
 import { getProfile } from "../../services/AuthService.jsx";

const FollowedBookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- MOCK DATA ĐỂ TEST GIAO DIỆN ---
//   const MOCK_DATA = [
//     {
//       id: 1,
//       title: "Chúa Tể Bóng Tối (Mock)",
//       slug: "chua-te-bong-toi",
//       img: "https://i.pinimg.com/564x/d8/d9/15/d8d915474320295da9489565575796b3.jpg",
//       Book_Status: { status_name: "Đang tiến hành" },
//       chapter: 152
//     },
//     {
//       id: 2,
//       title: "Thợ Săn Hạng S (Mock)",
//       slug: "tho-san-hang-s",
//       img: "https://i.pinimg.com/564x/4d/0e/41/4d0e4125b28d6849df3b6833989c9225.jpg",
//       Book_Status: { status_name: "Tạm ngưng" },
//       chapter: 90
//     },
//     {
//       id: 3,
//       title: "Solo Leveling (Mock)",
//       slug: "solo-leveling",
//       img: "https://i.pinimg.com/564x/a0/6d/8d/a06d8d64673625034602677770932560.jpg",
//       Book_Status: { status_name: "Hoàn thành" },
//       chapter: 179
//     },
//     {
//       id: 4,
//       title: "Đấu Phá Thương Khung (Mock)",
//       slug: "dau-pha-thuong-khung",
//       img: "https://i.pinimg.com/564x/52/63/82/526382903a89d70094939b4f997c4581.jpg",
//       Book_Status: { status_name: "Hoàn thành" },
//       chapter: "Full"
//     }
//   ];

  useEffect(() => {
    // Giả lập gọi API với độ trễ 1 giây
    const timer = setTimeout(() => {
      setLoading(true);
      
      // Trường hợp 1: Có dữ liệu (Bỏ comment dòng dưới để test list sách)
      setBooks(MOCK_DATA); 

      // Trường hợp 2: Rỗng (Bỏ comment dòng dưới để test giao diện trống)
      // setBooks([]); 

      // Trường hợp 3: Lỗi (Bỏ comment dòng dưới để test giao diện lỗi)
      // setError("Lỗi kết nối server giả định");

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileRes = await getProfile();
        if (!profileRes || !profileRes.user) {
            throw new Error("Bạn chưa đăng nhập.");
        }
        const userId = profileRes.user.id;

        const res = await getFollowBookbyUser(userId);
        
        let bookList = [];
        if (res && res.data) {
            bookList = res.data.map(item => {
                return item.Follow_Book || item.Book || item;
            });
        }
        setBooks(bookList);
      } catch (err) {
        console.error("Lỗi tải tủ sách:", err);
        setError("Vui lòng đăng nhập để xem tủ sách của bạn.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page-wrapper" style={{ 
        minHeight: "100vh", 
        // Ảnh nền anime chill hoặc thư viện (Link demo, bạn có thể thay ảnh khác)
        backgroundImage: "url('https://nhuhoaphat.com/wp-content/uploads/2022/03/100-A%CC%89nh-anime-girl-cute-a%CC%89nh-anime-nu%CC%9B%CC%83-hi%CC%80nh-ne%CC%82%CC%80n-anime-nu%CC%9B%CC%83-de%CC%A3p-nha%CC%82%CC%81t-cho-die%CC%A3%CC%82n-thoa%CC%A3i-728x375.jpeg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Giữ ảnh cố định khi cuộn chuột (Parallax)
        paddingTop: '40px',
        paddingBottom: '60px'
    }}>
      
      {/* 2. MAIN CONTAINER */}
      <div className="container">
        
        {/* 3. CONTENT BOX: Khung trắng bo góc chứa nội dung */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" 
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}> {/* 0.95 để nền hơi trong suốt nhẹ */}
            
            {/* Header của khung */}
            <div className="card-header bg-transparent border-0 pt-4 px-4 px-md-5">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-2">
                    <div>
                        <h2 className="fw-bold text-dark m-0 d-flex align-items-center">
                            {/* Icon trái tim trang trí */}
                            <span className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" 
                                  style={{width: '45px', height: '45px', fontSize: '20px'}}>
                                <i className="fa-solid fa-heart"></i>
                            </span>
                            Tủ Sách Của Tôi
                        </h2>
                    </div>
                    <Link to="/" className="btn btn-outline-dark rounded-pill px-4 fw-semibold">
                        <i className="fa-solid fa-house me-2"></i> Trang chủ
                    </Link>
                </div>
            </div>

            {/* Body chứa Grid Sách */}
            <div className="card-body p-4 p-md-5" style={{ minHeight: '400px' }}>
                
                {/* Dòng thông báo nhỏ (nếu có sách) */}
                {!loading && books.length > 0 && (
                    <div className="alert alert-light border border-dashed mb-4 d-flex align-items-center text-muted">
                        <i className="fa-solid fa-circle-info me-2 text-primary"></i>
                        Bạn đang theo dõi <strong className="text-dark mx-1">{books.length}</strong> bộ truyện. Chúc bạn đọc truyện vui vẻ!
                    </div>
                )}

                {/* --- LOADING --- */}
                {loading && (
                    <div className="d-flex flex-column align-items-center justify-content-center py-5 h-100">
                        <div className="spinner-border text-danger" style={{width: '3rem', height: '3rem'}} role="status"></div>
                        <span className="mt-3 text-secondary fw-semibold">Đang tải tủ sách...</span>
                    </div>
                )}

                {/* --- ERROR --- */}
                {!loading && error && (
                    <div className="alert alert-warning text-center shadow-sm py-4" role="alert">
                        <i className="fa-solid fa-triangle-exclamation fa-2x mb-2 d-block text-warning"></i>
                        <span className="fw-bold">{error}</span> 
                        <div className="mt-3">
                            <Link to="/login" className="btn btn-warning text-white rounded-pill px-4">Đăng nhập ngay</Link>
                        </div>
                    </div>
                )}

                {/* --- EMPTY STATE --- */}
                {!loading && !error && books.length === 0 && (
                    <div className="text-center py-5">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
                            alt="Empty" 
                            style={{ width: '150px', opacity: 0.8 }}
                            className="mb-4"
                        />
                        <h4 className="text-dark fw-bold">Tủ sách đang trống trơn!</h4>
                        <p className="text-muted mb-4">Bạn chưa theo dõi bộ truyện nào cả. Hãy khám phá thêm nhé.</p>
                        <Link to="/" className="btn btn-danger btn-lg rounded-pill px-5 shadow-sm">
                            <i className="fa-solid fa-compass me-2"></i> Khám phá truyện
                        </Link>
                    </div>
                )}

                {/* --- BOOK GRID --- */}
                {!loading && books.length > 0 && (
                    // Responsive Grid: 
                    // Mobile: 2 cột | Tablet: 3 cột | PC nhỏ: 4 cột | PC to: 5 cột
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {books.map((book, index) => (
                            <div className="col" key={book.id || index}>
                                <BookItem book={book} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer trang trí */}
            <div className="card-footer bg-light border-0 text-center py-3 text-muted small">
                Sayune Novel &copy; 2025 - Tủ sách cá nhân
            </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedBookPage;