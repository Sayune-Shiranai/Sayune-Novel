import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../../services/UserService";
import { getPagedRoles } from "../../../services/RoleService";
import "./UpdateUserPage.css";

const UpdateUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    book_number: "",
    title: "",
    another_name: "",
    author_id: "",
    artist_id: "",
    status: "",
    category[]: "",
    description: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await getUserById(id);
        const roleRes = await getPagedRoles();
        const user = userRes.data.data;
        
        setFormData({
          username: user.username,
          email: user.email,
          role_id: user.role_id,
        });

        setRoles(roleRes.data.data ?? roleRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      navigate("/dashboard/book");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-header-box container mt-4">
      <div className="page-title">
          <div className="row">
            <div className="col-6">
             <h4>Update Member
              </h4>
            </div>
          </div>
      </div>
      <div className="card p-2">
        <div className="card-body p-2">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Số truyện</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tên truyện</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tên khác</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tác giả</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Họa sĩ</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tình trạng</label>
              <select
                name="role_id"
                value={formData.role_id}
                className="form-control"
                onChange={handleChange}
              >
                <option value="">-- Chọn tình trạng --</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.role}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Thể loại</label>
              <select
                name="category_id"
                multiple
                className="form-control"
                onChange={handleChange}
              >
                {category.map((c) => (
                  <option key={c.id} value={c.id}>{c.category}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nội dung</label>
              <textarea
                name="description"
                rows="3"
                className="form-control"
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="btn btn-primary">
              Cập nhật
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
