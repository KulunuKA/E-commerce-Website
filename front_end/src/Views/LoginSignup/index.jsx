//Login Page
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-0.png";
import loginImg from "../../assets/login/login.jpg";
import Input from "../../Component/Input";
import { loginUser } from "../../APIs/userAPIs";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/user";
import Loading from "../../Component/Loader";
import Register from "./register";
import MyButton from "../../Component/Button";
import MyInput from "../../Component/input copy";

export default function Login() {
  const [tab, setTab] = useState(() => {
    const initialTab = window.location.hash.split("#")[1];
    return initialTab || "login";
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleInput = (field) => (e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
    setErr({ ...err, [field]: "" });
  };

  // Validate form inputs
  const validateForm = (formData) => {
    const newErr = {};

    if (!formData.email) {
      newErr.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErr.email = "Email is invalid";
    }

    if (!formData.password) {
      newErr.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErr.password = "Password must be at least 6 characters";
    }

    setErr(newErr);
    return Object.keys(newErr).length === 0;
  };

  // Authentication verifies the identity of a user
  const handelLogin = async (event) => {
    event.preventDefault();
    if (!validateForm(credentials)) {
      return;
    }
    setIsLoading(true);
    try {
      const { data, code, msg } = await loginUser(credentials);
      if (code === 0) {
        dispatch(setUser(data));
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: error?.response?.data?.msg || "Login Failed",
      });
    }
  };

  useEffect(() => {
    const changeTab = () => {
      const initialTab = window.location.hash.split("#")[1];
      setTab(initialTab || "login");
    };

    window.addEventListener("hashchange", changeTab);

    return () => {
      window.removeEventListener("hashchange", changeTab);
    };
  }, []);

  return (
    <div className="loginPage">
      <div className="loginImg">
        <img src={loginImg} alt="family clothing" />
      </div>
      <div className="login-details">
        <div className="login-logo">
          <img src={logo} alt="" />
        </div>

        {tab === "login" && (
          <form className="login-form" onSubmit={handelLogin}>
            <div className="login">
              <MyInput
                label={"Email"}
                value={credentials.email}
                onChange={handleInput("email")}
                error={err.email}
                errorMessage={err.email}
                type="email"
                placeholder="enter your email"
              />

              <MyInput
                label={"Password"}
                value={credentials.password}
                onChange={handleInput("password")}
                error={err.password}
                errorMessage={err.password}
                type="password"
                placeholder="enter your password"
              />

              <div className="password">
                <div className="remember">
                  <input type="checkbox" />
                  <p>Remember Me</p>
                </div>
                <a href="">Forget Password</a>
              </div>

              <div className="btn">
                <MyButton
                  name={"Login"}
                  width={150}
                  color="rgba(225, 10, 29, 0.95)"
                  loading={isLoading}
                />
              </div>
              <p>
                Don't have an account?{" "}
                <span
                  href=""
                  onClick={() => (window.location.hash = "register")}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && <Register />}
      </div>
    </div>
  );
}
