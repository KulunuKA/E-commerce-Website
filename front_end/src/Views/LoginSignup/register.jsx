import React, { useState } from "react";
import { registerUser } from "../../APIs/userAPIs";
import { notification } from "antd";
import Input from "../../Component/Input";
import Loading from "../../Component/Loader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Store/user";
import MyButton from "../../Component/Button";
import MyInput from "../../Component/input copy";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

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
  // Create User
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm(credentials)) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, code, msg } = await registerUser(credentials);
      if (code === 0) {
        navigate("/");
        dispatch(setUser(data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: error?.response?.data?.msg || "Registration Failed",
      });
    }
  };

  const handleInput = (field) => (e) => {
    setCredentials({ ...credentials, [field]: e.target.value });
    setErr({ ...err, [field]: "" });
  };

  return (
    <form className="login-form" onSubmit={handelSubmit}>
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

        <div className="btn">
          <MyButton
            name={"Register"}
            width={150}
            loading={isLoading}
            color="rgba(225, 10, 29, 0.95)"
          />
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
