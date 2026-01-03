import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AuthorPage.css";
import { 
  getPagedAuthors,
  deleteAuthor
} from "../../services/AuthorService";

export default function AuthorPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [authors, setAuthor] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    const loadAuthor = async () => {
      const res = await getPagedAuthors({
        page,
        limit,
        keyword,
      });

      if (!ignore) {
        setAuthor(res.data);
        setTotalPages(res.totalPages);
      }
    };

    loadAuthor();

    return () => {
      ignore = true;
    };
  }, [page, keyword]);

    const handleCreate = () => {
    navigate("/dashboard/author/create");
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa tác giả này?")) return;

    try {
      await deleteAuthor(id);

      const res = await getPagedAuthors({
        page: 1,
        limit,
        keyword,
      });

      setAuthor(res.data);
      setTotalPages(res.totalPages);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Xóa tác giả thất bại!"
      );
    }
  };

  return (
    <div className="main-page">
      <div className="page-header-box container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách tác giả</h4>
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
                    <th>Tác giả</th>
                    <th width="120">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    authors.map((author, i) => (
                      <tr key={author.id}>
                        <td className="text-center">{(page - 1) * limit + i + 1}</td>
                        <td>{author.name}</td>
                        <td className="text-center">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(author.id)}
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