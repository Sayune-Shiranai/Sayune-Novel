import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./BookFollowPage.css";
import { 
  getPagedBookFollows,
} from "../../services/BookFollowService";

export default function BookFollowPage() {
  const navigate = useNavigate();
  const [bookfollows, setBookFollow] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    const loadBookFollow = async () => {
      const res = await getPagedBookFollows({
        page,
        limit,
        keyword,
      });

      if (!ignore) {
        setBookFollow(res.data);
        setTotalPages(res.totalPages);
      }
    };

    loadBookFollow();

    return () => {
      ignore = true;
    };
  }, [page, keyword, limit]);

  return (
    <div className="main-page">
      <div className="page-header-box container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Thống kê theo dõi truyện</h4>
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

            </div>
          </div>

          <div className="card-body p-2">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Id</th>
                    <th>Số truyện</th>
                    <th>Tên truyện</th>
                    <th>Tên khác</th>
                    <th>Ảnh bìa</th>
                    <th>Tổng theo dõi</th>
                  </tr>
                </thead>
                <tbody>
                  {bookfollows.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    bookfollows.map((bookfollow, i) => (
                      <tr key={bookfollow.id}>
                        <td className="text-center">{(page - 1) * limit + i + 1}</td>
                        <td className="text-center">{bookfollow.book_number}</td>
                        <td>{bookfollow.title}</td>
                        <td>{bookfollow.another_name}</td>
                        <td>
                            <img
                                src={`http://localhost:3000${bookfollow.img}`}
                                alt={bookfollow.title}
                                style={{ width: 60, height: 80, objectFit: "cover" }}
                            />
                        </td>
                        <td
                          className="text-primary fw-bold text-center"
                          style={{ cursor: "pointer" }}
                          title="Xem danh sách người theo dõi"
                          onClick={() =>
                            navigate(`/dashboard/bookfollowing/${bookfollow.slug}`)
                          }
                        >
                          {bookfollow.Book_Follow_User?.length || 0}
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