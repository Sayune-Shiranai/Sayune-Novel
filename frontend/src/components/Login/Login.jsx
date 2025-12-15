import { useActionState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from '../../../../media/logo/logo.png'

const Login = () => {

  async function loginAction(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const remember = formData.get("remember") === "on";

    const errors = {};
    if (!username) errors.username = "Vui lòng nhập tên đăng nhập";
    if (!password) errors.password = "Vui lòng nhập mật khẩu";

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    console.log({ username, password, remember });

    return { success: true };
  }

  const [state, submit, pending] = useActionState(loginAction, {
    errors: {},
    success: false,
  });

  return (
    <form action={submit}>
      <div className="container">
        <div className="auth-body row justify-content-center">
          <div className="auth-form card">

            {/* HEADER */}
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
                Nếu gặp bất cứ vấn đề gì khi đăng nhập/đăng ký, vui lòng liên hệ{" "}
                <a href="#">tại đây</a>.
              </span>
            </div>

            {/* FORM */}
            <div className="auth-form__form">

              {/* USERNAME */}
              <div className="auth-form__group">
                <input
                  type="text"
                  className="auth-form__input mb-3"
                  placeholder="Tên đăng nhập"
                  name="username"
                />
                {state.errors?.username && (
                  <p className="text-center text-danger">
                    {state.errors.username}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="auth-form__group">
                <input
                  type="password"
                  className="auth-form__input mb-3"
                  placeholder="Mật khẩu"
                  name="password"
                />
                {state.errors?.password && (
                  <p className="text-center text-danger">
                    {state.errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* REMEMBER */}
            <div className="mb-3 d-flex justify-content-between">
              <div className="form-submit-checkbox">
                <input
                  className="form-checkbox me-1"
                  type="checkbox"
                  id="RememberMe"
                  name="remember"
                />
                <label htmlFor="RememberMe">Tự động đăng nhập</label>
              </div>
              <Link className="auth-form__submit-text" to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            {/* SUBMIT */}
            <div className="form-submit mb-3">
              <button
                className="auth-form__submit btn"
                type="submit"
                disabled={pending}
              >
                <span>{pending ? "Đang đăng nhập..." : "Đăng nhập"}</span>
              </button>
            </div>

            {/* GOOGLE */}
            <div className="form-submit-other text-center mb-3">
              <a
                href="http://localhost:3000/auth/google"
                className="auth-form__submit btn"
              >
                <span>Đăng nhập với Google</span>
              </a>
            </div>

            {/* REGISTER */}
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
