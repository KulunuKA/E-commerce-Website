import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/logo_FH.png";
import { notification } from "antd";
import Loading from "../../Component/Loader/index";
import { useNavigate } from "react-router-dom";
import { login } from "../../APIs/adminAPIs";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/user";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handelInput = (field) => (e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, code, msg } = await login(credentials);

      if (code == 0) {
        navigate("/dashboard", { replace: true });
        dispatch(setUser(data));
      } else {
        notification.error({
          message: msg || "Something went wrong!",
        });
      }
      setIsLoading(false);
    } catch (error) {
      notification.error({
        message: error?.response?.data?.msg || "Something went wrong!",
      });
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <form className="lg-form" onSubmit={handleSubmit}>
          <section className="logo">
            <div className="logo-img">
              <img src={logo} alt="foodWorld3D_logo" />
            </div>
            <p>Fashion Hub Admin</p>
          </section>
          <section className="input-sec">
            <div className="input">
              <label>Email</label>
              <input
                type="email"
                value={credentials.email}
                required
                onChange={handelInput("email")}
              />
            </div>
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                required
                onChange={handelInput("password")}
              />
            </div>
            <div className="lg-btn">
              {isLoading ? (
                <Loading size={34} />
              ) : (
                <button type="submit">Login</button>
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
