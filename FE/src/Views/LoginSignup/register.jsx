import React, { useState } from "react";
import { registerUser } from "../../APIs/userAPIs";
import { notification } from "antd";
import Input from "../../Component/Input";
import Loading from "../../Component/Loader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Store/user";
import MyButton from "../../Component/Button";

export default function Register() {
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
  // Create User
  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!credentials.email && !credentials.password) {
      setErr({ email: "Email is required" });
      setErr({ password: "Password is required" });
    } else if (!credentials.email) {
      setErr({ email: "Email is required" });
    } else if (!credentials.password) {
      setErr({ password: "Password is required" });
    } else {
      try {
        const { data, code, msg } = await registerUser(credentials);
        if (code === 200) {
          //   navigate("/");
          dispatch(setUser(data));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: error?.response?.data?.msg || "Registration Failed",
        });
      }
    }
  };

  const handleInput = (field) => (e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
    setErr({ ...err, [field]: "" });
  };

  return (
    <form className="login-form" onSubmit={handelSubmit}>
      <div className="login">
        <Input
          type="email"
          label={"Email"}
          placeholder="Example@gmail.com"
          value={credentials.email}
          onChange={handleInput("email")}
          err={err.email}
        />

        <Input
          type="password"
          label={"Password"}
          placeholder="password"
          value={credentials.password}
          onChange={handleInput("password")}
          err={err.password}
        />

        <div className="btn">
          {isLoading ? (
            <Loading size={30} />
          ) : (
            <MyButton name={"Register"} width={150} />
          )}
        </div>

        <p>
          Do you have an account?{" "}
          <span href="" onClick={() => (window.location.hash = "login")}>
            Login
          </span>
        </p>
      </div>
    </form>
  );
}
