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
    username: "",
    email: "",
    role_id: "",
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
      navigate("/dashboard/user");
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
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Vai trò</label>
              <select
                name="role_id"
                value={formData.role_id}
                className="form-control"
                onChange={handleChange}
              >
                <option value="">-- Chọn vai trò --</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.role}</option>
                ))}
              </select>
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
