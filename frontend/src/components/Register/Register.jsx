import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../../../../media/logo/logo.png";

const initialState = {
  success: false,
  errors: {},
  formData: {
    username: "",
    email: "",
    password: "",
    confirm: "",
    AgreeTerm: false,
  },
};

const Register = () => {
  const navigate = useNavigate();

  async function registerAction(prevState, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    const AgreeTerm = formData.get("AgreeTerm") === "on";

    const errors = {};
    if (!username) errors.username = "Tên đăng nhập không được để trống!";
    if (!email) errors.email = "Email không được để trống!";
    if (!password) errors.password = "Mật khẩu không được để trống";
    if (!confirm) errors.confirm = "Vui lòng nhập lại mật khẩu";
    if (password && confirm !== confirm) {
      errors.confirm = "Mật khẩu không khớp";
    }
    if (!AgreeTerm) {
      errors.AgreeTerm = "Bạn phải đồng ý với điều khoản";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        formData: { username, email, password, confirm, AgreeTerm },
      };
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword:confirm }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          errors: {
            general: data.message || "Đăng ký thất bại",
          },
          formData: { username, email, password, confirm},
        };
      }

      navigate("/");

      return {
        success: true,
        errors: {},
        formData: {},
      };
    } catch (err) {
        console.error("FETCH FAILED:", err);
        alert(err.message);
      return {
        success: false,
        errors: {
          general: "Không kết nối được server",
        },
        formData: { username, email, password, confirm},
      };
    }
  }

  const [state, submit, pending] = useActionState(
    registerAction,
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
                  type="email"
                  className="auth-form__input mb-3"
                  placeholder="Email"
                  name="email"
                  defaultValue={state.formData?.email || ""}
                />
                {state.errors?.email && (
                  <p className="text-center text-danger">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className="role">
                <input type="hidden" name="role" value="Member" />
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

              <div className="auth-form__group">
                <input
                  type="password"
                  className="auth-form__input mb-3"
                  placeholder="Nhập lại mật khẩu"
                  name="confirm"
                  defaultValue={state.formData?.confirm || ""}
                />
                {state.errors?.confirm && (
                  <p className="text-center text-danger">
                    {state.errors.confirm}
                  </p>
                )}
              </div>

              {state.errors?.general && (
                <p className="text-center text-danger mb-3">
                  {state.errors.general}
                </p>
              )}
            </div>

            <div className="mb-3 d-flex justify-content-between flex-column">
              <div className="form-submit-checkbox">
                <input
                  className="form-checkbox me-1"
                  type="checkbox"
                  id="AgreeTerm"
                  name="AgreeTerm"
                  defaultChecked={state.formData?.AgreeTerm}
                />
                <label htmlFor="AgreeTerm"
                  >Tôi đồng ý với{" "}
                  <Link className="auth-form__submit-text" to="#">
                    điều khoản của SayuneNovel
                  </Link>
                </label>
              </div>
              {state.errors?.AgreeTerm && (
                <p className="text-center text-danger mt-2 mb-0">
                  {state.errors.AgreeTerm}
                </p>
              )}
            </div>

            <div className="form-submit mb-3">
              <button
                className="auth-form__submit btn"
                type="submit"
                disabled={pending}
              >
                {pending ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </div>

            <div className="auth-form__submit-another mb-3">
              <span>
                Đã có tài khoản?{" "}
                <Link to="/login">Đăng nhập</Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
