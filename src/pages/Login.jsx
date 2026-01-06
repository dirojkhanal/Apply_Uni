import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/apply-uni-logo.png";
import "../assets/style.css";
import { loginUser } from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validate = () => {
    const err = {};
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.password.trim()) err.password = "Password is required";
    return err;
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const { data } = await loginUser(form);

      //Set token expiry (1 hour)
      const expiryTime = Date.now() + 60 * 1 * 1;

      // Save auth data
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("tokenExpiry", expiryTime.toString());
      sessionStorage.setItem(
        "student",
        JSON.stringify(data.user.student)
      );
      sessionStorage.setItem("status", data.user.status);

      toast.update(toastId, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          "Invalid email or password",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper__section">
      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="content-wrapper">

            {/* LEFT SECTION */}
            <div className="left-section">
              <div className="welcome-content">
                <h1>Welcome Back</h1>
                <div className="brand-logo">
                  <img
                    src={logo}
                    alt="ApplyUni Logo"
                    className="brand-icon"
                  />
                </div>
                <p className="tagline">
                  Login to continue accessing your dashboard
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="right-section">
              <div className="form-container">
                <h2 className="form-title">Login</h2>
                <h3 className="section-title">Student Login</h3>

                <div className="form-content">

                  {/* EMAIL */}
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="inputForm"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="error-text">{errors.email}</p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div className="form-group">
                    <label>Password *</label>
                    <div className="password-field">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="inputForm password-input"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <span
                        className="password-eye"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="error-text">{errors.password}</p>
                    )}
                  </div>

                  {/* LOGIN BUTTON */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="next-btn"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  {/* REGISTER LINK */}
                  <p className="register-link-text">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/student-register"
                      className="register-link"
                    >
                      Register here
                    </Link>
                  </p>

                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
