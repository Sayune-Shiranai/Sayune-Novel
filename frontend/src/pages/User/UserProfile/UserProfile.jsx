import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: 1,
        username: "WIBU LỌ",
        email: "lovuong.dev@example.com",
        role: "Thành Viên",      
        trangthai: "Hoạt động",     
        img_avatar: "https://ui-avatars.com/api/?name=LỌVƯƠNG&background=0D8ABC&color=fff&size=256",
        img_background: "https://images4.alphacoders.com/936/936378.jpg",
        createdAt: "20/10/2023"
    });

    const getStatusColor = (statusText) => {
        if (statusText === "Hoạt động") return "bg-success"; // Sửa lại khớp với data mẫu
        if (statusText === "Bị khóa") return "bg-danger";
        return "bg-secondary";
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url(${"https://img-cdn.2game.vn/2021/02/25/Kimetsu-no-Yaiba-Royale-Bi-kip-sinh-ton-cua-tho-san-quy-1.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
        }}>
            
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(3px)',
                zIndex: 1
            }}></div>


            <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                
                        <div className="mb-3">
                            <button 
                            className="btn btn-light hover-shadow text-dark fw-bold shadow-sm" 
                            onClick={() => navigate(-1)}
                            >
                            <i className="bi bi-arrow-left me-2"></i> Quay lại
                            </button>
                        </div>

                        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                            
                            <div style={{ height: '200px', backgroundColor: '#333' }}>
                            <img 
                                src={user.img_background || "https://placehold.co/800x200"} 
                                alt="Cover" 
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }} 
                            />
                            </div>

                            <div className="card-body text-center p-0">
                            
                            <div 
                                className="position-relative d-inline-block"
                                style={{ marginTop: '-75px' }} 
                            >
                                <img 
                                src={user.img_avatar || "https://placehold.co/150"} 
                                alt="Avatar" 
                                className="rounded-circle border border-4 border-white shadow-sm"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', backgroundColor: '#fff' }}
                                />
                            </div>


                            <div className="mt-3 px-4">
                                <h3 className="fw-bold mb-1">{user.username}</h3>
                                
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                <span className="badge bg-primary">
                                    {user.role} 
                                </span>
                                <span className={`badge ${getStatusColor(user.trangthai)}`}>
                                    {user.trangthai}
                                </span>
                                </div>

                                <div className="card bg-light border-0 rounded-3 text-start mb-4">
                                <div className="card-body">
                                    <div className="row g-3">
                                    <div className="col-6">
                                        <small className="text-muted d-block fw-bold text-uppercase">ID Người dùng</small>
                                        <span className="fw-medium">#{user.id}</span>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block fw-bold text-uppercase">Email</small>
                                        <span className="fw-medium text-break">{user.email || "Chưa cập nhật"}</span>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block fw-bold text-uppercase">Vai trò</small>
                                        <span className="fw-medium">{user.role}</span>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block fw-bold text-uppercase">Ngày tham gia</small>
                                        <span className="fw-medium">{user.createdAt}</span>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-4">
                                <button className="btn btn-primary px-4 rounded-pill">
                                    <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa
                                </button>
                                <button className="btn btn-outline-secondary px-4 rounded-pill">
                                    <i className="bi bi-key me-2"></i> Đổi mật khẩu
                                </button>
                                </div>

                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;