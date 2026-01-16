import React from "react";
import './ProfilePage.css'

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile container-fluid" style={{ minHeight: "100vh" }}>
        <div className="main">
          <div className="profile-user grid__full-width">
            <div className="profile-background row">
              <div className="save-edit-img-profile"></div>

              <div className="profile-background-container col-lg-8">
                <div className="detail-profile-background grid__full-width">
                  <div
                    className="background-sub grid__full-width"
                    style={{ top: "calc(-100% + 0px)" }}
                  >
                    <img
                      src="/public_html/assets/img/background-profile/sekai-ka-kanojo-erabenai.png"
                      alt=""
                      className="background-data grid__full-width"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info row">
              <div className="detail-profile col-lg-8">
                <div className="profile-container row">
                  <div className="avatar-profile">
                    <div className="avatar-profile-user">
                      <div className="avatar-data"></div>
                    </div>
                  </div>

                  <div className="info-user">
                    <div className="name-user">Sayune Shiranai</div>
                  </div>

                  <div className="info-another"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className="statistic-profile row">
                  <div className="title-profile">
                    <div className="level-profile row">
                      <strong>Cấp 1</strong>
                      <strong>Cấp 2</strong>
                    </div>

                    <div className="exp-profile">
                      <div className="detail-exp-profile"></div>

                      <div className="rate-exp-profile">
                        <div className="text-exp-profile">50%</div>
                      </div>
                    </div>

                    <div className="text-base"></div>
                  </div>
                </div>

                <div className="statistic-profile row">
                  <div className="col-lg-6 col-12">
                    <div className="statistic-value">1000</div>
                    <div className="statistic-name">Chương đã đăng</div>
                  </div>

                  <div className="col-lg-6 col-12">
                    <div className="statistic-value">20</div>
                    <div className="statistic-name">Đang theo dõi</div>
                  </div>

                  <div className="col-lg-12 col-12 mt-2">
                    <div className="statistic-value">5000</div>
                    <div className="statistic-name">Bình luận</div>
                  </div>
                </div>

                <div className="sect-body statistic-profile">
                  <div className="profile-info-items">
                    <strong className="info-name">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      Biệt danh:
                    </strong>
                    <span className="info-value"> Sayune </span>
                  </div>

                  <div className="profile-info-items">
                    <p>
                      'The more hope you hold. The more despair you'll feel'
                    </p>
                  </div>

                  <div className="profile-info-items">
                    <strong className="info-name">
                      <i className="fa-solid fa-calendar"></i>
                      Ngày sinh:
                    </strong>
                    <span className="info-value"> 14/04/2004 </span>
                  </div>

                  <div className="profile-info-items">
                    <strong className="info-name">
                      <i className="fa-solid fa-star"></i>
                      Sở thích:
                    </strong>
                    <span className="info-value"> Romcom is the best </span>
                  </div>

                  <div className="profile-info-items">
                    <strong className="info-name">
                      <i className="fa-solid fa-users"></i>
                      Tham gia:
                    </strong>
                    <span className="info-value"> 14/04/2004 </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-9">
                <div className="profile-showcase">
                  <header>
                    <span>Truyện đã đăng</span>
                  </header>

                  <div className="row">
                    {[1, 2].map((_, index) => (
                      <div className="col-12 col-lg-6" key={index}>
                        <div className="showcase-item">
                          <div className="row">
                            <div className="series-showcase-item col-lg-4">
                              <div className="showcase-item-img">
                                <a
                                  href="#"
                                  style={{
                                    backgroundImage:
                                      "url('/public_html/assets/img/new/s8252-0346ad8b-a078-491b-ad09-dfdf065a2615.jpg')",
                                  }}
                                ></a>
                              </div>
                            </div>

                            <div className="title-showcase-item col-lg-8">
                              <div className="series-info">
                                <div className="title-series">
                                  <a href="#">
                                    Kết hôn với đứa con gái mà tôi cực ghét trong
                                    lớp.
                                  </a>
                                </div>
                              </div>

                              <div className="detail-series">
                                <div className="chapter-info">
                                  <a href="#">Chapter 2</a>
                                </div>

                                <div className="detail-time-info">
                                  <time
                                    className="time-info"
                                    dateTime="2024-07-12T02:08:48+07:00"
                                  >
                                    1 ngày
                                  </time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
