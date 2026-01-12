import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookBySlug } from '../../../services/BookService';
import { getProfile } from '../../../services/AuthService';
import { getPagedVolumes } from '../../../services/VolumeService';
import './BookDetail.css';

const BookDetail = () => {
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const [volumes, setVolumes] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('intro');
  
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                setLoading(true);
                
                try {
                    const userProfile = await getProfile();
                    setUser(userProfile.data);
                } catch (error) {
                    console.log("User not logged in or error fetching profile");
                }

                const response = await getBookBySlug(slug);
                setBook(response.data);

            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBookData();
        }
    }, [slug]);
    useEffect(() => {
        const fetchVolumes = async () => {
            if (!slug) return;

            try {
                const volumeResponse = await getPagedVolumes({ page, limit, keyword, slug });
                if (volumeResponse && volumeResponse.data) {
                     setVolumes(volumeResponse.data);
                     setTotalPages(volumeResponse.totalPages || 0);
                } else {
                    setVolumes(Array.isArray(volumeResponse) ? volumeResponse : []);
                }
                
            } catch (error) {
                console.error("Error fetching volumes:", error);
            }
        };

        fetchVolumes();
    }, [slug, page, limit, keyword]);


    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
  
    if (!book) return (
        <div className="alert alert-danger text-center m-5">Không tìm thấy truyện!</div>
    );

    const categories = book.Book_Category || [];
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
                {/* Intro Tab */}
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
                            <h5 className="fw-bold m-0">{vol.title || `Tập ${vol.volume_number}`}</h5>
                            </div>
                            
                            <div className="row g-2">
                            {vol.Volume_VolumePost && vol.Volume_VolumePost.length > 0 ? (
                                vol.Volume_VolumePost.map(chap => (
                                <div key={chap.id} className="col-6 col-md-4 col-lg-3">
                                    <Link 
                                    to={`/truyen/${book.slug}/${chap.id}`} 
                                    className="btn btn-light w-100 text-start bookdetail-text-truncate border bookdetail-hover-shadow"
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
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <button 
                                className="btn btn-outline-secondary me-2" 
                                disabled={page === 1}
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            >
                                Trước
                            </button>
                            <span className="align-self-center mx-2">Trang {page} / {totalPages}</span>
                            <button 
                                className="btn btn-outline-secondary ms-2" 
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            >
                                Sau
                            </button>
                        </div>
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