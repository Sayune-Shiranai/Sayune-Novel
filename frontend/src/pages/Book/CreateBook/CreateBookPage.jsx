import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../services/BookService"; 
// import { getPagedCategories } from "../../../services/CategoryService";
import { getPagedAuthors } from "../../../services/AuthorService";
import { getPagedArtists } from "../../../services/ArtistService";
import { getPagedStatus } from "../../../services/StatusService";

const CreateBookPage = () => {
  const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [artists, setArtists] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const [formData, setFormData] = useState({
    book_number: "",
    title: "",
    another_name: "",
    author_id: "",
    artist_id: "",
    status: "",
    description: "",
    // category_id: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const categoryRes = await getPagedCategories({ page: 1, limit: 100 });
        const authorRes = await getPagedAuthors({ page: 1, limit: 100 });
        const artistRes = await getPagedArtists({ page: 1, limit: 100 });
        const statusRes = await getPagedStatus({ page: 1, limit: 100 });

        // setCategories(categoryRes.data.data);
        setAuthors(authorRes.data.data ?? authorRes.data);
        setArtists(artistRes.data.data ?? artistRes.data);
        setStatusList(statusRes.data.data ?? statusRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);
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
                <h4>Thêm Truyện</h4>
            </div>
        </div>
    </div>
    <div className="card p-2">
        <div className="card-body p-2"></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Book Number</label>
                    <input
                        className="form-control"
                        name="book_number"
                        placeholder="Book Number"
                        value={formData.book_number}
                        onChange={handleChange}
                    />
                </div>  
            
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Another Name</label>
                    <input
                        className="form-control"
                        name="another_name"
                        placeholder="Another Name"
                        value={formData.another_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ảnh bìa</label>
                    <input
                        type="file"
                        name="img"
                        className="form-control"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <select
                        name="author_id"
                        className="form-control"
                        value={formData.author_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn tác giả --</option>
                        {authors.map((a) => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Artist</label>
                    <select
                        name="artist_id"
                        className="form-control"
                        value={formData.artist_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn họa sĩ --</option>
                        {artists.map((a) => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-control"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">-- Trạng thái --</option>
                        {statusList.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Thể loại</label>
                    <textarea
                        className="form-control"
                        name="category_id"
                        rows="4"
                        placeholder="Thể loại"
                        value={formData.category_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary">
                Thêm mới
                </button>
            </form>
        </div>
    </div>
);
};

export default CreateBookPage;
