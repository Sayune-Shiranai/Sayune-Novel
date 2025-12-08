import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    role_id: ""
  });

  // ⭐ Role
  const [roles, setRoles] = useState([]);

  // 🔥 LOAD USERS — đưa vào effect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard/user", {
          params: { page, limit, keyword }
        });

        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [page, limit, keyword]); // không cần useCallback

  // 🔥 LOAD ROLES — cũng đưa vào effect
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard/role");
        setRoles(res.data);
      } catch (err) {
        console.error("Lỗi load roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleSearch = () => {
    setPage(1);
  };

  const openEditModal = (user) => {
    setEditUser({
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id
    });
    setShowEdit(true);
  };

  const updateUserSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/dashboard/user/update/${editUser.id}`,
        {
          username: editUser.username,
          email: editUser.email,
          role_id: editUser.role_id
        }
      );

      setShowEdit(false);

      // Sau khi cập nhật → reload danh sách
      const res = await axios.get("http://localhost:3000/dashboard/user", {
        params: { page, limit, keyword }
      });
      setUsers(res.data.data);

    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
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
                  <span className="badge bg-info">
                    {u.User_Role?.role ?? "N/A"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(u)}
                  >
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

      {/* Modal Update */}
      {showEdit && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Cập nhật người dùng</h5>
                <button className="btn-close" onClick={() => setShowEdit(false)} />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={editUser.username}
                    onChange={(e) =>
                      setEditUser({ ...editUser, username: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={editUser.role_id}
                    onChange={(e) =>
                      setEditUser({ ...editUser, role_id: e.target.value })
                    }
                  >
                    <option value="">-- Chọn role --</option>

                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>
                  Hủy
                </button>

                <button className="btn btn-primary" onClick={updateUserSubmit}>
                  Lưu lại
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
