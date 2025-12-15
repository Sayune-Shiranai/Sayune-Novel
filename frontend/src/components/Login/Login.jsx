//thêm phân quyền
import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../../../media/logo/logo.png";

const initialState = {
  success: false,
  errors: {},
  formData: {
    username: "",
    password: "",
    remember: false,
  },
};

const Login = () => {
  const navigate = useNavigate();

  async function loginAction(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const remember = formData.get("remember") === "on";

    const errors = {};
    if (!username) errors.username = "Vui lòng nhập tên đăng nhập!";
    if (!password) errors.password = "Vui lòng nhập mật khẩu!";

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        formData: { username, password, remember },
      };
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          errors: {
            general: data.message || "Đăng nhập thất bại",
          },
          formData: { username, password },
        };
      }

      navigate("/");

      return {
        success: true,
        errors: {},
        formData: {},
      };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        errors: {
          general: "Không kết nối được server",
        },
        formData: { username, password },
      };
    }
  }

  const [state, submit, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={submit}>
      <div className="container">
        <div className="auth-body row justify-content-center">
          <div className="auth-form card">

            <div className="auth-form__header">
              <div className="auth-form__heading">
                <div className="auth-form__logo">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                  <div className="auth-form__title">SayuneNovel</div>
                </div>
              </div>

              <span className="auth-form__notice">
                Nếu gặp vấn đề khi đăng nhập/đăng ký, vui lòng liên hệ{" "}
                <a href="#">tại đây</a>.
              </span>
            </div>

            <div className="auth-form__form">
              <div className="auth-form__group">
                <input
                  type="text"
                  className="auth-form__input mb-3"
                  placeholder="Tên đăng nhập"
                  name="username"
                  defaultValue={state.formData?.username || ""}
                />
                {state.errors?.username && (
                  <p className="text-center text-danger">
                    {state.errors.username}
                  </p>
                )}
              </div>

              <div className="auth-form__group">
                <input
                  type="password"
                  className="auth-form__input mb-3"
                  placeholder="Mật khẩu"
                  name="password"
                  defaultValue={state.formData?.password || ""}
                />
                {state.errors?.password && (
                  <p className="text-center text-danger">
                    {state.errors.password}
                  </p>
                )}
              </div>

              {state.errors?.general && (
                <p className="text-center text-danger mb-3">
                  {state.errors.general}
                </p>
              )}
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <div className="form-submit-checkbox">
                <input
                  className="form-checkbox me-1"
                  type="checkbox"
                  id="RememberMe"
                  name="remember"
                  defaultChecked={state.formData?.remember}
                />
                <label htmlFor="RememberMe">Tự động đăng nhập</label>
              </div>
              <Link className="auth-form__submit-text" to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            <div className="form-submit mb-3">
              <button
                className="auth-form__submit btn"
                type="submit"
                disabled={pending}
              >
                {pending ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>

            <div className="form-submit-other text-center mb-3">
              <a
                href="http://localhost:3000/auth/google"
                className="auth-form__submit btn"
              >
                Đăng nhập với Google
              </a>
            </div>

            <div className="auth-form__submit-another mb-3">
              <span>
                Chưa có tài khoản?{" "}
                <Link to="/register">Đăng ký ngay</Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
