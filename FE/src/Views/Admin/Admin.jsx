import React, { useState } from "react";
import "./Admin.css";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import AddProduct from "../../Component/AddProduct/AddProduct";
import ListProduct from "../../Component/ListProduct/ListProduct";

const Admin = () => {
  const [tab, setTab] = useState("addproduct");
  return (
    <div className="admin">
      <div className="sidebar">
        <p
          onClick={() => setTab("addproduct")}
          style={{ textDecoration: "none" }}
        >
          <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </p>
        <p onClick={() => setTab("list")} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
          </div>
        </p>
      </div>

      {tab === "addproduct" ? <AddProduct /> : <ListProduct />}
    </div>
  );
};

export default Admin;
