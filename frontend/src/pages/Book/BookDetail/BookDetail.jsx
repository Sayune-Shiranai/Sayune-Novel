import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookBySlug } from '../../../services/BookService';
import './BookDetail.css';

{/*DataMock*/}
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
      status: 1,
      description: "Câu chuyện về một chàng trai muốn trở thành kẻ đứng sau giật dây...",
      user_id: 101,
      trangthai: 1, 
      createdAt: "2023-10-20T00:00:00.000Z",
      updatedAt: "2023-10-25T00:00:00.000Z",
      Book_Author: { name: "Daisuke Aizawa" },
      Book_Status: { status_name: "Đang tiến hành" },
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
const generateDummyVolumes = (bookId) => {
  return [
    {
      id: 1,
      name: "Tập 1: Khởi đầu",
      order_number: 1,
      Book_VolumePost: [
        { id: 101, title: "Chương 1: Mở mắt thấy trần nhà lạ" },
        { id: 102, title: "Chương 2: Cuộc gặp gỡ định mệnh" },
        { id: 103, title: "Chương 3: Sức mạnh thức tỉnh" },
        { id: 104, title: "Chương 4: Rời khỏi tân thủ thôn" },
      ]
    },
    {
      id: 2,
      name: "Tập 2: Hành trình",
      order_number: 2,
      Book_VolumePost: [
        { id: 201, title: "Chương 5: Đối thủ đầu tiên" },
        { id: 202, title: "Chương 6: Bí mật được hé lộ" },
        { id: 203, title: "Chương 7: Nguy hiểm rình rập" },
      ]
    }
  ];
};
{/*DataMock*/}

const BookDetail = () => {
    const { slug } = useParams();
    console.log("Slug from URL:", slug);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('intro');
    {/*fix thì gỡ ra*/}
//   useEffect(() => {
//     const fetchBookData = async () => {
//       try {
//         const response = await getBookBySlug(slug);
//         setBook(response.data);
//       } catch (error) {
//         console.error("Lỗi:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookData();
//   }, [slug]);


    {/*MOCK DATA fix thì gỡ ra*/}
    useEffect(() => {
        setLoading(true);
        
        const timer = setTimeout(() => {
            if (slug) {
                let found = 
                  booksData.newUpdates.find(b => b.slug === slug) ||
                  booksData.mystery.find(b => b.slug === slug) ||
                  booksData.romance.find(b => b.slug === slug);
        
                if (found) {
                  const fullDataBook = {
                    ...found,
                    description: found.description || "Đây là mô tả chi tiết của truyện. Nhân vật chính bắt đầu hành trình tại một thế giới khác...",
                    Book_Category: found.Book_Category || [{ id: 1, category: "Action" }, { id: 2, category: "Fantasy" }], 
                    Book_Volume: generateDummyVolumes(found.id)
                  };
                  setBook(fullDataBook);
                } else {
                  setBook(null);
                }
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [slug]);
    {/*fix thì gỡ ra*/}


    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
  
    if (!book) return (
        <div className="alert alert-danger text-center m-5">Không tìm thấy truyện!</div>
    );

    const categories = book.Book_Category || [];
    const volumes = book.Book_Volume || [];
    const authorName = book.Book_Author?.name || "Đang cập nhật";

    return (
        <div className="bg-light min-vh-100 pb-5">
        
        <div className="position-relative bg-dark text-white overflow-hidden shadow-sm">
            <div 
            className="position-absolute w-100 h-100"
            style={{ 
                backgroundImage: `url(${book.img})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                filter: 'blur(20px) brightness(0.4)',
                zIndex: 0
            }}
            ></div>

            <div className="container position-relative py-5" style={{ zIndex: 1 }}>
            <div className="row g-4 align-items-center">
                
                <div className="col-md-3 text-center">
                <img 
                    src={book.img} 
                    alt={book.title} 
                    className="img-fluid rounded-3 shadow-lg border border-secondary"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                />
                </div>

                <div className="col-md-9">
                <h1 className="display-5 fw-bold">{book.title}</h1>
                {book.another_name && <p className="text-light fst-italic mb-3">{book.another_name}</p>}

                <div className="d-flex flex-wrap gap-3 mb-3 text-white-50">
                    <span><i className="bi bi-person-fill"></i> {authorName}</span>
                    <span><i className="bi bi-tag-fill"></i> {book.Book_Status?.status_name}</span>
                    <span><i className="bi bi-upload"></i> {book.Book_User?.username || "Admin"}</span>
                </div>
                <div className="mb-4">
                    {categories.map(cat => (
                    <span key={cat.id} className="badge rounded-pill bg-danger bg-opacity-75 me-2 border border-danger">
                        {cat.category}
                    </span>
                    ))}
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3">
                    <button className="btn btn-danger btn-lg rounded-pill px-4">
                    <i className="bi bi-book-half me-2"></i> Đọc Từ Đầu
                    </button>
                    <button className="btn btn-outline-light btn-lg rounded-pill px-4">
                    <i className="bi bi-heart me-2"></i> Theo Dõi
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="container mt-n5 position-relative" style={{ top: '-30px', zIndex: 2 }}>
            <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-4">
                <ul className="nav nav-pills mb-4 border-bottom pb-3" id="bookTabs">
                <li className="nav-item">
                    <button 
                    className={`nav-link fw-bold px-4 ${activeTab === 'intro' ? 'active bg-danger' : 'text-secondary'}`}
                    onClick={() => setActiveTab('intro')}
                    >
                    <i className="bi bi-info-circle me-2"></i> Giới Thiệu
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                    className={`nav-link fw-bold px-4 ${activeTab === 'chapters' ? 'active bg-danger' : 'text-secondary'}`}
                    onClick={() => setActiveTab('chapters')}
                    >
                    <i className="bi bi-list-ol me-2"></i> Ds. Chương
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                    className={`nav-link fw-bold px-4 ${activeTab === 'comments' ? 'active bg-danger' : 'text-secondary'}`}
                    onClick={() => setActiveTab('comments')}
                    >
                    <i className="bi bi-chat-dots me-2"></i> Bình Luận
                    </button>
                </li>
                </ul>

                <div className="tab-content">
                {activeTab === 'intro' && (
                    <div className="p-2">
                    <h5 className="fw-bold text-dark mb-3">Tóm tắt nội dung</h5>
                    <p className="text-secondary lh-lg" style={{ whiteSpace: 'pre-line' }}>
                        {book.description || "Chưa có mô tả."}
                    </p>
                    </div>
                )}

                {activeTab === 'chapters' && (
                    <div>
                    {volumes.length > 0 ? (
                        volumes.map((vol) => (
                        <div key={vol.id} className="mb-4">
                            <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-journal-bookmark-fill text-danger fs-5 me-2"></i>
                            <h5 className="fw-bold m-0">{vol.name || `Tập ${vol.order_number}`}</h5>
                            </div>
                            
                            <div className="row g-2">
                            {vol.Book_VolumePost && vol.Book_VolumePost.length > 0 ? (
                                vol.Book_VolumePost.map(chap => (
                                <div key={chap.id} className="col-6 col-md-4 col-lg-3">
                                    <Link 
                                    to={`/truyen/${book.slug}/${chap.id}`} 
                                    className="btn btn-light w-100 text-start text-truncate border hover-shadow"
                                    title={chap.title}
                                    >
                                    <small className="text-muted me-2">#{chap.id}</small>
                                    {chap.title}
                                    </Link>
                                </div>
                                ))
                            ) : (
                                <p className="text-muted fst-italic ms-3">Đang cập nhật chương...</p>
                            )}
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center py-5 text-muted">Chưa có danh sách tập.</div>
                    )}
                    </div>
                )}
                {activeTab === 'comments' && (
                    <div>
                    <div className="mb-4">
                        <textarea className="form-control mb-2" rows="3" placeholder="Viết bình luận của bạn..."></textarea>
                        <div className="text-end">
                        <button className="btn btn-primary px-4">Gửi</button>
                        </div>
                    </div>
                    <div className="alert alert-light text-center border border-dashed">
                        Chức năng bình luận đang được phát triển.
                    </div>
                    </div>
                )}
                </div>

            </div>
            </div>
        </div>
        </div>
    );
};

export default BookDetail;