import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from '../../Middleware/AuthContext'
import "./ArtistPage.css";
import { 
  getPagedArtists,
  deleteArtist
} from "../../services/ArtistService";

export default function ArtistPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [artists, setArtist] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);

  const role = user?.role;

  const hasRole = (roles = []) => {
    if (!role) return false;
    return roles.includes(role);
  };

  useEffect(() => {
    let ignore = false;

    const loadArtist = async () => {
      const res = await getPagedArtists({
        page,
        limit,
        keyword,
      });

      if (!ignore) {
        setArtist(res.data);
        setTotalPages(res.totalPages);
      }
    };

    loadArtist();

    return () => {
      ignore = true;
    };
  }, [page, keyword]);

    const handleCreate = () => {
    navigate("/dashboard/artist/create");
  }

  const handleDelete = async (id) => { 
    if (!window.confirm("Xóa họa sĩ này?")) return; 

    try {
      await deleteArtist(id); 

      const res = await getPagedArtists({
        page: 1,
        limit,
        keyword,
      });

      setArtist(res.data);
      setTotalPages(res.totalPages);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Xóa họa sĩ thất bại!"
      );
    }
  };

  return (
    <div className="main-page">
      <div className="page-header-box container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách họa sĩ</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body-box container-fluid">
        <div className="card p-2">
          {errorMessage && (
            <div className="alert alert-danger mb-2">
              {errorMessage}
            </div>
          )}
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
                <button 
                className="btn btn-success"
                onClick={handleCreate} 
                title="Thêm mới">Thêm mới</button>
              </div>
            </div>
          </div>

          <div className="card-body p-2">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Id</th>
                    <th>Họa sĩ</th>
                    {hasRole(["Admin", "Mod"]) && (
                      <>
                        <th width="120">Chức năng</th>
                      </>
                    )} 
                  </tr>
                </thead>
                <tbody>
                  {artists.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    artists.map((artist, i) => (
                      <tr key={artist.id}>
                        <td className="text-center">{(page - 1) * limit + i + 1}</td>
                        <td>{artist.name}</td>
                        {hasRole(["Admin", "Mod"]) && (
                          <>
                            <td className="text-center">
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(artist.id)}
                                  title="Xóa"
                                >
                                  <FaTrash />
                                </button>
                            </td>
                          </>
                        )}
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