import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handelClick = async () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className="newA-Item">
      <div
        className="newA-Img"
        onMouseEnter={() => {
          setShowCart(true);
        }}
        onMouseLeave={() => {
          setShowCart(false);
        }}
        onClick={handelClick}
      >
        <img src={props.images[0]} alt="" />

        {showCart && (
          <div className="viewImg">
            <a href="" className="addCart">
              SELECT OPTIONS{" "}
              <span>
                <i className="bi bi-cart-plus"></i>
              </span>
            </a>
          </div>
        )}
      </div>
      <div className="newA-info">
        <p>{props.name}</p>
        <p id="price">{props.price}</p>
      </div>
    </div>
  );
}
