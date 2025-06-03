import React from "react";
import NavBar from "../NavBar/index";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const paths = ["/login", "/register", "/dashboard", "/admin/login"];
  return (
    <main className="App">
      {!paths.includes(path) && <NavBar />}
      <hr />
      <Outlet />
      {!paths.includes(path) && <Footer />}
    </main>
  );
}
