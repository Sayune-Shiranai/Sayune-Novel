import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../services/BookService"; 
import { getPagedCategories } from "../../../services/CategoryService";
import { getPagedAuthors } from "../../../services/AuthorService";
import { getPagedArtists } from "../../../services/ArtistService";
import { getPagedStatus } from "../../../services/StatusService";

const CreateBookPage = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [artists, setArtists] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [img, setImg] = useState(null);

    const [formData, setFormData] = useState({
        book_number: "",
        title: "",
        another_name: "",
        author_id: "",
        artist_id: "",
        status: "",
        description: "",
        category_id: [],
    });

    const validate = () => {
        const newErrors = {};

        if (!formData.book_number.trim()) {
            newErrors.book_number = "Vui lòng nhập số truyện";
        } else if (isNaN(formData.book_number)) {
            newErrors.book_number = "Số truyện phải là số";
        }

        if (!formData.title.trim()) {
            newErrors.title = "Vui lòng nhập tên truyện";
        }

        if (!formData.author_id) {
            newErrors.author_id = "Vui lòng chọn tác giả";
        }

        if (!formData.artist_id) {
            newErrors.artist_id = "Vui lòng chọn họa sĩ";
        }

        if (!formData.status) {
            newErrors.status = "Vui lòng chọn trạng thái";
        }

        if (!formData.category_id.length) {
            newErrors.category_id = "Vui lòng chọn ít nhất 1 thể loại";
        }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await getPagedCategories({ page: 1, limit: 100 });
        const authorRes = await getPagedAuthors({ page: 1, limit: 100 });
        const artistRes = await getPagedArtists({ page: 1, limit: 100 });
        const statusRes = await getPagedStatus({ page: 1, limit: 100 });

        setCategories(categoryRes.data.data ?? categoryRes.data);
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
        const { name, value, multiple, selectedOptions } = e.target;

        if (multiple) {
            const values = Array.from(selectedOptions, opt => opt.value);
            setFormData(prev => ({
            ...prev,
            [name]: values,
            }));
        } else {
            setFormData(prev => ({
            ...prev,
            [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const payload = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === "category_id") {
                formData.category_id.forEach(id => payload.append("category_id[]", id));
            } else {
                payload.append(key, formData[key]);
            }
        });

        if (img) payload.append("img", img);

        try {
            await createBook(payload);
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
                        <label className="form-label">Số truyện</label>
                        <input
                            className={`form-control ${errors.book_number ? "is-invalid" : ""}`}
                            name="book_number"
                            placeholder="Book Number"
                            value={formData.book_number}
                            onChange={handleChange}
                        />
                        {errors.book_number && (
                            <div className="invalid-feedback">{errors.book_number}</div>
                        )}
                    </div>  
                
                    <div className="mb-3">
                        <label className="form-label">Tên truyện</label>
                        <input
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && (
                            <div className="invalid-feedback">{errors.title}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tên khác</label>
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
                        <label className="form-label">Tác giả</label>
                        <select
                            className={`form-control ${errors.author_id ? "is-invalid" : ""}`}
                            name="author_id"
                            value={formData.author_id}
                            onChange={handleChange}
                        >
                            <option value="">-- Chọn tác giả --</option>
                            {authors.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                        </select>
                        {errors.author_id && (
                            <div className="invalid-feedback">{errors.author_id}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Họa sĩ</label>
                        <select
                            className={`form-control ${errors.artist_id ? "is-invalid" : ""}`}
                            name="artist_id"
                            value={formData.artist_id}
                            onChange={handleChange}
                        >
                            <option value="">-- Chọn họa sĩ --</option>
                            {artists.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        {errors.artist_id && (
                            <div className="invalid-feedback">{errors.artist_id}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <select
                            className={`form-control ${errors.status ? "is-invalid" : ""}`}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">-- Trạng thái --</option>
                            {statusList.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        {errors.status && (
                            <div className="invalid-feedback">{errors.status}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Thể loại</label>
                        <select
                            className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
                            name="category_id"
                            multiple
                            value={formData.category_id}
                            onChange={handleChange}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.category}</option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <div className="invalid-feedback">{errors.category_id}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="4"
                            placeholder="Mô tả"
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
