import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminSideBar";

export default function AdminLayout() {
  const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  };
  return (
    <main className="admin-layout">
      <div style={style}>
        <AdminSideBar />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
