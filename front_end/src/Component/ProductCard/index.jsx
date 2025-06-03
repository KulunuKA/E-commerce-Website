import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handelClick = async () => {
    navigate(`/product/${props.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to cart clicked for:", name);
  };
  return (
    <div className="product-card">
      <div
        className="product-image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handelClick}
      >
        <img
          src={props.images?.[0] || "/api/placeholder/300/350"}
          alt={props.name || "Product"}
          className="product-image"
        />

        {isHovered && (
          <div className="product-overlay">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              SELECT OPTIONS
              <span className="cart-icon">🛒</span>
            </button>
          </div>
        )}

        {/* Optional: Add badges/labels */}
        <div className="product-badges">
          {/* You can add sale, new, etc. badges here */}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{props.name || "Product Name"}</h3>
        <div className="product-pricing">
          <span className="product-price">LRK {props.price || "$0.00"}</span>
          <span className="product-original-price">$99.99</span>
        </div>
      </div>
    </div>
  );
}
