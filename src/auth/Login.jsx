import React, { useState, useEffect } from "react";
import "./login.css";
import logo from "../assets/images/KodukkuLogo.svg";
import { UserCircle, LockOpen } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../react-redux/actions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { authapi } from "../config/serverUrl";
const Login = () => {
  const initialValue = { email: "", password: "" };
  const [value, setValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setloginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (formErrors[id]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const errors = validate(value);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${authapi}/auth/signin`, value);
        const data = response.data;

        if (data.code == 200) {
          dispatch(loginUser(data));
          toast.success("Successfully Logged In");
        } else if (data.code == 401) {
          setloginError("Invalid Email or Password");
          return;
        }

        if (rememberMe) {
          Cookies.set("rememberedEmail", value.email, { expires: 7 });
          Cookies.set("rememberedPassword", value.password, { expires: 7 });
        } else {
          Cookies.remove("rememberedEmail");
          Cookies.remove("rememberedPassword");
        }

        if (data.code == 200) {
          navigate("/main");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <div className="head ">
            <h5 className="text-center" style={{ color: "#4A4A4A" }}>
              Log in or Sign up
            </h5>
          </div>
          <div className="content">
            <div className="title d-flex align-items-center justify-content-center mb-3">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "4rem",
                  border: "2px solid #68BCFF",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
              <h3 style={{ color: "#2196F3", marginLeft: "10px" }}>Welcome!</h3>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{
                    borderColor: isSubmit && formErrors.email ? "red" : "",
                  }}
                >
                  <UserCircle size={28} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={value.email}
                style={{
                  borderColor: isSubmit && formErrors.email ? "red" : "",
                }}
              />
            </div>
            {isSubmit && <p style={{ color: "red" }}>{formErrors.email}</p>}
            <div className="input-group mt-4">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{
                    borderColor: isSubmit && formErrors.password ? "red" : "",
                  }}
                >
                  <LockOpen size={28} />
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={value.password}
                style={{
                  borderColor: isSubmit && formErrors.password ? "red" : "",
                }}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              ></span>
            </div>
            {isSubmit && <p style={{ color: "red" }}>{formErrors.password}</p>}
            {loginError && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
            <div className="reset-pass d-flex justify-content-between my-3">
              <div className="d-flex align-items-center">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  id="rememberMeCheckbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <p>Remember me</p>
              </div>
              <Link to="/resetpassword">
                <p style={{ cursor: "pointer" }}>Reset Password</p>
              </Link>
            </div>

            <button className="btn continue btn-primary mt-4">Continue</button>
            <p className="mt-3">
              <Link to="/register" style={{ color: "#2196F3" }}>
                New user registration
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
