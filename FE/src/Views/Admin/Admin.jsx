import React, { useState } from "react";
import { PlusSquare, List } from "lucide-react"; // Lucide icons
import "./Admin.css";
import AddProduct from "../../Component/AddProduct/AddProduct";
import ListProduct from "../../Component/ListProduct";

const Admin = () => {
  const [tab, setTab] = useState("addproduct");

  return (
    <div className="admin">
      <aside className="sidebar">
        <button
          className={`sidebar-item ${tab === "addproduct" ? "active" : ""}`}
          onClick={() => setTab("addproduct")}
        >
          <PlusSquare size={20} />
          <span>Add Product</span>
        </button>
        <button
          className={`sidebar-item ${tab === "list" ? "active" : ""}`}
          onClick={() => setTab("list")}
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
