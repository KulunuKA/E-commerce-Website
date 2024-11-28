import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/LoginSignup";
import Layout from "./Component/Layout";
import OneItem from "./Views/oneItem/index";
import AllClothing from "./Views/AllClothing";
import CartPage from "./Views/Cart/index";
import Admin from "./Views/Admin/Admin";
import AdminLogin from "./Views/Admin Login";
import RequireRoute from "./Route/requireRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<OneItem />} />
          <Route path="/product/:gender/:cate" element={<AllClothing />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />

          {/* Protected route */}
          <Route element={<RequireRoute allowedRoles={"Admin"} />}>
            <Route path="/dashboard" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
