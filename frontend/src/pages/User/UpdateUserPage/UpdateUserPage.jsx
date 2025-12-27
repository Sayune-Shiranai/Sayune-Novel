import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../../services/UserService";

const UpdateUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);

        const user = res.data.data;

        setFormData({
          username: user.username,
          email: user.email,
          role: user.User_Role?.role,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  /* Handle input */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      alert("Cập nhật thành công");
      navigate("/dashboard/user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Update Member</h5>
        </div>

        <div className="card-body">
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
              <input
                type="text"
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
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
