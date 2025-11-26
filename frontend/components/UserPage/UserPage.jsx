import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:7010/users/get-paged", {
        params: { page, limit, keyword }
      });

      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Danh sách người dùng</h2>

      {/* Search box */}
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Chức năng</th>
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
            users.map((u, index) => (
              <tr key={u.id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge bg-info">{u.User_Role?.name ?? "N/A"}</span>
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

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 && "disabled"}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                &laquo;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 && "active"}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${page === totalPages && "disabled"}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
