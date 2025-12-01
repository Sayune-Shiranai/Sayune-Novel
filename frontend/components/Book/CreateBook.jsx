import { useState, useEffect } from "react";
import axios from "axios";

export default function BookCreatePage() {
  const [category, setCategory] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [artists, setArtists] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    book_number: "",
    title: "",
    another_name: "",
    author_id: "",
    artist_id: "",
    status: "",
    description: "",
    user_id: "",
    category_id: [],
  });

  const [img, setImg] = useState(null);

  // Load all select data
useEffect(() => {
  axios.get("http://localhost:3000/dashboard/category").then(res => setCategory(res.data.data ?? res.data));
  axios.get("http://localhost:3000/dashboard/authors").then(res => setAuthors(res.data.data ?? res.data));
  axios.get("http://localhost:3000/dashboard/artists").then(res => setArtists(res.data.data ?? res.data));
  axios.get("http://localhost:3000/dashboard/status").then(res => setStatusList(res.data.data ?? res.data));
  axios.get("http://localhost:3000/dashboard/user").then(res => setUsers(res.data.data));  // ✔ FIX
}, []);

  // Handle text and select change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Multi–select categories
    if (name === "category_id") {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, category_id: selected });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === "category_id") {
        formData.category_id.forEach(id => form.append("category_id[]", id));
      } else {
        form.append(key, formData[key]);
      }
    });

    if (img) form.append("img", img);

    try {
      const res = await axios.post("http://localhost:3000/dashboard/book/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tạo book thành công!");
      console.log(res.data);

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Lỗi tạo book!");
    }
  };

  return (
    <div className="container mt-4">

      <h3>Create Book</h3>

      <form onSubmit={handleSubmit}>

        {/* book_number */}
        <div className="mb-3">
          <label>Book Number</label>
          <input  
            type="number"
            name="book_number"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* title */}
        <div className="mb-3">
          <label>Title</label>
          <input  
            type="text"
            name="title"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* another name */}
        <div className="mb-3">
          <label>Another Name</label>
          <input  
            type="text"
            name="another_name"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Author */}
        <div className="mb-3">
          <label>Author</label>
          <select name="author_id" className="form-control" onChange={handleChange}>
            <option value="">-- Select author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        {/* Artist */}
        <div className="mb-3">
          <label>Artist</label>
          <select name="artist_id" className="form-control" onChange={handleChange}>
            <option value="">-- Select artist --</option>
            {artists.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="mb-3">
          <label>Status</label>
          <select name="status" className="form-control" onChange={handleChange}>
            <option value="">-- Select status --</option>
            {statusList.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* User */}
        <div className="mb-3">
          <label>User</label>
          <select name="user_id" className="form-control" onChange={handleChange}>
            <option value="">-- Select user --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Categories Multiple */}
        <div className="mb-3">
          <label>Category</label>
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

        {/* Image */}
        <div className="mb-3">
          <label>Upload Image</label>
          <input
            type="file"
            name="img"
            className="form-control"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}
