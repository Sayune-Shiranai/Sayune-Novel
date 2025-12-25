import React from "react";
import "./HomePage.css";

const Home = () => {
  return (
    <>
      {/* PAGE TITLE */}
      <div className="container-fluid">
        <div className="page-title">
          <div className="row">
            <div className="col-6">
              <h4>Danh sách ứng viên</h4>
            </div>
            <div className="col-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">
                    <svg className="stroke-icon">
                      <use href="/svg/icon-sprite.svg#stroke-home" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumb-item">Quản trị nội dung</li>
                <li className="breadcrumb-item active">Ứng viên</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="container-fluid">
        <div className="row">

          {/* Server-side processing Starts */}
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header pb-0 card-no-border">
                <div className="row">

                  {/* SEARCH */}
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-10 d-flex">
                        <input
                          type="text"
                          className="form-control flex-grow-1 me-2"
                          placeholder="Nhập vào từ khóa ..."
                          autoComplete="off"
                        />
                        <button className="btn btn-primary">
                          Tìm kiếm
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="col-md-6">
                    <div className="d-flex flex-wrap justify-content-end align-items-center gap-2">
                      <button className="btn btn-primary">
                        Thêm mới
                      </button>

                      <button className="btn btn-success">
                        <i className="fa fa-upload me-1"></i> Import
                      </button>

                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".xlsx,.xls"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* TABLE */}
              <div className="card-body">
                <div className="table-responsive custom-scrollbar">
                  <table className="display w-100">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên ứng viên</th>
                        <th>Email</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Nguyễn Văn A</td>
                        <td>a@gmail.com</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-1">Sửa</button>
                          <button className="btn btn-sm btn-danger">Xóa</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
