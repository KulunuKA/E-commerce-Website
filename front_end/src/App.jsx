import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/LoginSignup";
import Layout from "./Component/Layouts/Layout";
import OneItem from "./Views/OneProduct";
import AllClothing from "./Views/AllClothing";
import CartPage from "./Views/Cart/index";
import AdminLogin from "./Views/Admin Login";
import RequireRoute from "./Route/requireRoute";
import CheckOut from "./Views/Checkout/index";
import AdminLayout from "./Component/Layouts/AdminLayout";
import AddProduct from "./Views/AddProduct";
import ListProduct from "./Views/ListProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<OneItem />} />
          <Route path="/products/:gender/:cate" element={<AllClothing />} />
          <Route path="/products/:cate" element={<AllClothing />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />

          <Route element={<RequireRoute allowedRoles={"Customer"} />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>

         
        </Route>

         {/* Protected route */}
          <Route element={<RequireRoute allowedRoles={"Admin"} />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route path="add-product" element={<AddProduct />} />
              <Route path="product-list" element={<ListProduct />} />
            </Route>
          </Route>
      </Routes>
    </>
  );
}

export default App;
