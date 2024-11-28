//Login Page
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-0.png";
import loginImg from "../../assets/login/login.jpg";
import Button from "../../Component/Button";
import Input from "../../Component/Input";
import { loginUser } from "../../APIs/userAPIs";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/user";
import Loading from "../../Component/Loader";
import Register from "./register";

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
  const [err, setErr] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleInput = (field) => (e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
    setErr({ ...err, [field]: "" });
  };

  // Authentication verifies the identity of a user
  const handelLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!credentials.email) {
      setErr({ email: "Email is required" });
    } else if (!credentials.password) {
      setErr({ password: "Password is required" });
    } else {
      try {
        const { data, code, msg } = await loginUser(credentials);
        if (code === 200) {
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
    <>
      <div className="loginPage">
        <div className="loginImg">
          <img src={loginImg} alt="family clothing" />
        </div>
        <div className="login-details">
          <div className="logo">
            <img src={logo} alt="" />
          </div>

          {tab === "login" && (
            <form className="login-form" onSubmit={handelLogin}>
              <div className="login">
                <Input
                  type="email"
                  placeholder="Example@gmail.com"
                  value={credentials.email}
                  onChange={handleInput("email")}
                  err={err.email}
                />

                <Input
                  type="password"
                  placeholder="password"
                  value={credentials.password}
                  onChange={handleInput("password")}
                  err={err.password}
                />

                <div className="password">
                  <div className="remember">
                    <input type="checkbox" />
                    <p>Remember Me</p>
                  </div>
                  <a href="">Forget Password</a>
                </div>

                <div className="btn">
                  {isLoading ? (
                    <Loading size={30} />
                  ) : (
                    <Button text={"Login"} height={30} width={150} />
                  )}
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
    </>
  );
}
