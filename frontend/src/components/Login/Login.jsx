import React from 'react'

const Login = () => {
  return (
    <div>
        <form>
            <input type="email" />
            <input type="password" />
            <button>Đăng nhập</button>
        </form>
    </div>
  )
}

export default Login


// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     remember: false,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // demo validate
//     const newErrors = {};
//     if (!form.username) newErrors.username = "Vui lòng nhập tên đăng nhập";
//     if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     console.log("LOGIN DATA:", form);
//     // TODO: call API login
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <div className="card shadow mt-5">
//             <div className="card-body">

//               {/* LOGO */}
//               <div className="text-center mb-4">
//                 <Link to="/">
//                   <img src="/img/logo.png" alt="Logo" height="50" />
//                 </Link>
//                 <h4 className="mt-2">SayuneNovel</h4>
//               </div>

//               <p className="text-center text-muted small">
//                 Nếu gặp vấn đề khi đăng nhập/đăng ký, vui lòng liên hệ{" "}
//                 <a href="#">tại đây</a>.
//               </p>

//               <form onSubmit={handleSubmit}>
//                 {/* USERNAME */}
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Tên đăng nhập"
//                     name="username"
//                     value={form.username}
//                     onChange={handleChange}
//                   />
//                   {errors.username && (
//                     <small className="text-danger">{errors.username}</small>
//                   )}
//                 </div>

//                 {/* PASSWORD */}
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Mật khẩu"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                   />
//                   {errors.password && (
//                     <small className="text-danger">{errors.password}</small>
//                   )}
//                 </div>

//                 {/* REMEMBER */}
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="remember"
//                       id="remember"
//                       checked={form.remember}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="remember">
//                       Ghi nhớ đăng nhập
//                     </label>
//                   </div>

//                   <Link to="/forgot-password" className="small">
//                     Quên mật khẩu?
//                   </Link>
//                 </div>

//                 {/* SUBMIT */}
//                 <button type="submit" className="btn btn-primary w-100 mb-3">
//                   Đăng nhập
//                 </button>
//               </form>

//               {/* GOOGLE */}
//               <a
//                 href="http://localhost:3000/auth/google"
//                 className="btn btn-outline-danger w-100 mb-3"
//               >
//                 Đăng nhập với Google
//               </a>

//               {/* REGISTER */}
//               <div className="text-center">
//                 <span>
//                   Chưa có tài khoản?{" "}
//                   <Link to="/register">Đăng ký ngay</Link>
//                 </span>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
