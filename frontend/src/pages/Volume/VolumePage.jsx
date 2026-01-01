import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./VolumePage.css";
import { 
  getPagedVolumes,
  deleteVolume
} from "../../services/VolumeService";

export default function VolumePage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [volumes, setVolumes] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadVolumes = async () => {
            if (!slug) return;

            const res = await getPagedVolumes({
                page,
                limit,
                keyword,
                slug
            });

            setVolumes(res.data);
            setTotalPages(res.totalPages);
        };

        loadVolumes();
    }, [page, keyword, limit, slug]);

    const handleCreate = (slug) => {
        navigate(`/dashboard/book/${slug}/volume/create`);
    }

    const handleDelete = async (slug, id) => {
    if (!window.confirm("Xóa chương này?")) return;

    await deleteVolume(slug, id);

    const res = await getPagedVolumes({ page: 1, limit, keyword, slug });

    setVolumes(res.data);
    setTotalPages(res.totalPages);
    setPage(1);
    };


  return (
    <div className="main-page">
      <div className="page-header-box container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách chương</h4>
            </div>
            {/* <div className="col-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Quản trị hệ thống</li>
                <li className="breadcrumb-item active">Truyện</li>
              </ol>
            </div> */}
          </div>
        </div>
      </div>

      <div className="page-body-box container-fluid">
        <div className="card p-2">
          <div className="header-page-body-box card-header p-2 border-0">
            <div className="row align-items-center">
              <div className="search-box col-md-6 d-flex">
                <input
                  className="form-control me-2"
                  placeholder="Nhập từ khóa..."
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                  }}
                />
                <button className="btn btn-primary">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>
                  Tìm kiếm
                </button>
              </div>

              <div className="col-md-6 text-end">
                <button className="btn btn-success" 
                onClick={() => handleCreate(slug)} title="Thêm mới">Thêm mới</button>
              </div>
            </div>
          </div>

          <div className="card-body p-2">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Id</th>
                    <th>Chương</th>
                    <th>Tên chương</th>
                    <th>Người tạo</th>
                    <th width="120">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {volumes.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    volumes.map((volume, i) => (
                      <tr key={volume.id}>
                        <td>{(page - 1) * limit + i + 1}</td>
                        <td>{volume.volume_number}</td>
                        <td>{volume.title}</td>
                        <td>{volume.Volume_User?.username}</td>
                        <td className="text-center">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(volume.id)}
                              title="Xóa"
                            >
                              <FaTrash />
                            </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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