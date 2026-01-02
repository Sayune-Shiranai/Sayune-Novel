import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./BookPage.css";
import { 
  getPagedBooks,
  deleteBook, 
  approveBook, 
  rejectBook
} from "../../services/BookService";

export default function BookPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    const loadBooks = async () => {
      const res = await getPagedBooks({
        page,
        limit,
        keyword,
      });

      if (!ignore) {
        setBooks(res.data);
        setTotalPages(res.totalPages);
      }
    };

    loadBooks();

    return () => {
      ignore = true;
    };
  }, [page, keyword, limit]);

  const handleCreate = () => {
    navigate("/dashboard/book/create");
  }

  const handleUpdate = (slug) => {
    navigate(`/dashboard/book/update/${slug}`);
  };


  const handleDelete = async (id) => { 
    if (!window.confirm("Xóa truyện này?")) return; 
    await deleteBook(id); 
    const res = await getPagedBooks({ page: 1, limit, keyword });
    setBooks(res.data);
    setTotalPages(res.totalPages);
    setPage(1);
  };

  const handleApprove = async (id) => { 
    await approveBook(id); 
    const res = await getPagedBooks({ page, limit, keyword });
    setBooks(res.data);
    setTotalPages(res.totalPages);
  }; 

  const handleReject = async (id) => { 
    await rejectBook(id); 
    const res = await getPagedBooks({ page, limit, keyword });
    setBooks(res.data);
    setTotalPages(res.totalPages);
 }; 

  return (
    <div className="main-page">
      <div className="page-header-box container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách truyện</h4>
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
                    <th>Số truyện</th>
                    <th>Tên truyện</th>
                    <th>Tên khác</th>
                    <th>Ảnh bìa</th>
                    <th>Tác giả</th>
                    <th>Họa sĩ</th>
                    <th>Tình Trạng</th>
                    <th>Thể loại</th>
                    <th>Nội dung</th>
                    <th>Tổng chương</th>
                    <th>Người tạo</th>
                    <th>Trạng thái kiểm duyệt</th>
                    <th width="120">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    books.map((book, i) => (
                      <tr key={book.id}>
                        <td className="text-center">{(page - 1) * limit + i + 1}</td>
                        <td className="text-center">{book.book_number}</td>
                        <td>{book.title}</td>
                        <td>{book.another_name}</td>
                        <td>
                            <img
                                src={`http://localhost:3000${book.img}`}
                                alt={book.title}
                                style={{ width: 60, height: 80, objectFit: "cover" }}
                            />
                        </td>
                        <td>{book.Book_Author?.name}</td>
                        <td>{book.Book_Artist?.name}</td>
                        <td>{book.Book_Status?.name}</td>
                        <td>
                            {book.Book_Category && book.Book_Category.length > 0
                                ? book.Book_Category.map(c => c.category).join(", ") : "—"
                            }
                        </td>
                        <td>{book.description}</td>
                        <td
                          className="text-primary fw-bold text-center"
                          style={{ cursor: "pointer" }}
                          title="Xem danh sách chương"
                          onClick={() =>
                            navigate(`/dashboard/book/${book.slug}/volume`)
                          }
                        >
                          {book.Book_Volume?.length || 0}
                        </td>
                        <td>{book.Book_User?.username}</td>
                        <td>
                          {book.trangthai === 0 && (
                            <span className="badge bg-warning text-dark">Chờ duyệt</span>
                          )}
                          {book.trangthai === 1 && (
                            <span className="badge bg-success">Đã duyệt</span>
                          )}
                          {book.trangthai === 2 && (
                            <span className="badge bg-danger">Từ chối</span>
                          )}
                        </td>
                        <td className="text-center">
                          {book.trangthai === 0 && (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleApprove(book.id)}
                              >
                                ✓
                              </button>
                              <button
                                className="btn btn-sm btn-warning text-dark"
                                onClick={() => handleReject(book.id)}
                              >
                                ✕
                              </button>
                            </>
                          )}

                          {book.trangthai === 2 && (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleApprove(book.id)}
                              title="Duyệt"
                            >
                              ✓
                            </button>
                            <button
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleUpdate(book.slug)}
                              title="Chỉnh sửa"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(book.id)}
                              title="Xóa"
                            >
                              <FaTrash />
                            </button>
                          </>
                          )}

                          {book.trangthai === 1 && (
                            <button
                              className="btn btn-sm btn-warning text-dark"
                              onClick={() => handleReject(book.id)}
                            >
                              ✕
                            </button>
                          )}
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