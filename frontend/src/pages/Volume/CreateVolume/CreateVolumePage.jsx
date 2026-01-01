import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVolume } from "../../../services/VolumeService";

const CreateVolumePage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        volume_number: "",
        title: "",
    });

    const validate = () => {
        const newErrors = {};
        if (!formData.volume_number.trim()) {
        newErrors.volume_number = "Vui lòng nhập số chương";
        } else if (isNaN(formData.volume_number)) {
        newErrors.volume_number = "Số chương phải là số";
        }

        if (!files || files.length === 0) {
            newErrors.files = "Vui lòng chọn ít nhất 1 ảnh";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = new FormData();
        payload.append("volume_number", formData.volume_number);
        payload.append("title", formData.title);

        for (const file of files) {
        payload.append("chapter_content", file);
        }

        try {
        await createVolume(payload, slug);
        navigate(`/dashboard/book/${slug}/volume`);
        } catch (err) {
        console.error(err);
        }
    };


    return (
        <div className="page-header-box container mt-4">
            <div className="page-title">
                <div className="row">
                    <div className="col-6">
                        <h4>Thêm Chương</h4>
                    </div>
                </div>
            </div>
        <div className="card p-2">
            <div className="card-body p-2"></div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Số chương</label>
                        <input
                            className={`form-control ${errors.volume_number ? "is-invalid" : ""}`}
                            name="volume_number"
                            placeholder="Volume Number"
                            value={formData.volume_number}
                            onChange={handleChange}
                        />
                        {errors.volume_number && (
                            <div className="invalid-feedback">{errors.volume_number}</div>
                        )}
                    </div>  
                
                    <div className="mb-3">
                        <label className="form-label">Tên chương</label>
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
                        <label className="form-label">Chọn ảnh</label>
                        <input
                            type="file"
                            multiple
                            name="chpater_content"
                            className={`form-control ${errors.files ? "is-invalid" : ""}`}
                            onChange={(e) => setFiles(e.target.files)}
                        />
                        {errors.files && (
                            <div className="invalid-feedback">{errors.files}</div>
                        )}
                    </div>

                    <button className="btn btn-primary">
                    Thêm mới
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateVolumePage;
