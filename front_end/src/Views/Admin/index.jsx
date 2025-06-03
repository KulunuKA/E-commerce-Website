import React, { useState } from "react";
import { PlusSquare, List } from "lucide-react"; // Lucide icons
import "./style.css";
import AddProduct from "../../Component/AddProduct/AddProduct";
import ListProduct from "../../Component/ListProduct";

const Admin = () => {
  const [hash, setHash] = useState(window.location.hash.replace("#", ""));
  const [tab, setTab] = useState(hash || "addproduct");

  return (
    <div className="admin">
      <aside className="sidebar">
        <button
          className={`sidebar-item ${tab === "addproduct" ? "active" : ""}`}
          onClick={() => {
            window.location.hash = "#addproduct";
          }}
        >
          <PlusSquare size={20} />
          <span>Add Product</span>
        </button>
        <button
          className={`sidebar-item ${tab === "list" ? "active" : ""}`}
          onClick={() => (window.location.hash = "#list")}
        >
          <List size={20} />
          <span>Product List</span>
        </button>
      </aside>
      <main className="content">
        {tab === "addproduct" ? <AddProduct /> : <ListProduct />}
      </main>
    </div>
  );
};

export default Admin;
