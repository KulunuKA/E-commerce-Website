import React, { useEffect, useState } from "react";
import { List, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function AdminSideBar() {
  const [tab, setTab] = useState("addproduct");
  const tablist = [
    {
      name: "addproduct",
      title: "Add Product",
      query: "add-product",
      icon: <PlusSquare size={20} />,
    },
    {
      name: "list",
      title: "Product List",
      query: "product-list",
      icon: <List size={20} />,
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname.split("/")[2];
    setTab(path);
  }, []);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      {tablist.map((item) => (
        <button
          key={item.name}
          className={`sidebar-item ${tab === item.query ? "active" : ""}`}
          onClick={() => {
            setTab(item.query);
            navigate(`/dashboard/${item.query}`);
          }}
        >
          {item.icon}
          <span>{item.title}</span>
        </button>
      ))}
    </aside>
  );
}
