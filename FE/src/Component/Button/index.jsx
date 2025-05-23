import React from "react";
import { Button } from "antd";

export default function MyButton({
  name = "Submit",
  onClick,
  loading,
  disabled,
  size = "large",
  icon,
  danger,
  ghost,
  color,
  width,
  mt,
}) {
  return (
    <Button
      htmlType="submit"
      type="primary"
      shape="round"
      size={size}
      onClick={onClick}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      danger={danger}
      ghost={ghost}
      style={{
        backgroundColor: color || "rgba(57, 62, 65, 1)",
        width: width,
        color: "white",
        fontSize: loading && 20,
        borderRadius: 24,
        marginTop: mt,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? "" : name}
    </Button>
  );
}
