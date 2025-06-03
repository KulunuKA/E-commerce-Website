import React from "react";
import "./style.css";

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  err,
}) {
  return (
    <div className="l-input">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={
          !err
            ? { border: "1px solid #5a5a5a" }
            : { border: "1px solid #d32f2f" }
        }
      />
      <div className="input-err">{err && <p>{err}</p>}</div>
    </div>
  );
}
