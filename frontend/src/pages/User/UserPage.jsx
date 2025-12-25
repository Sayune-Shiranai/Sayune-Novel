import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UserPage.css";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/dashboard/user", {
      params: { page, limit, keyword }
    });
    setUsers(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  fetchUsers();
}, [page, keyword]);

  return (
    <div className="main-page">
      {/* ===== PAGE TITLE ===== */}
      <div className="container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách người dùng</h4>
            </div>
            {/* <div className="col-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Quản trị hệ thống</li>
                <li className="breadcrumb-item active">Người dùng</li>
              </ol>
            </div> */}
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container-fluid">
        <div className="card p-2">
          <div className="card-header p-2 border-0">
            <div className="row align-items-center">
              <div className="col-md-6 d-flex">
                <input
                  className="form-control me-2"
                  placeholder="Nhập từ khóa..."
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1); // ✅ reset page khi search
                  }}
                />
                <button className="btn btn-primary">Tìm kiếm</button>
              </div>

              <div className="col-md-6 text-end">
                <button className="btn btn-success">Thêm mới</button>
              </div>
            </div>
          </div>

          <div className="card-body p-2">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th width="120">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    users.map((u, i) => (
                      <tr key={u.id}>
                        <td>{(page - 1) * limit + i + 1}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className="badge bg-info">
                            {u.User_Role?.role}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2">
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${page === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
