import React from "react";
import "./style.css";
import p1 from "../../assets/Process/p-1.png";
import p2 from "../../assets/Process/p-2.png";
import p3 from "../../assets/Process/p-3.png";

export default function CheckOutProcess(props) {
  const pathname = window.location.pathname;

  const activeStyle = {
    background: "#e10a1d",
    // background: "#000000",
    borderRadius: "50%",
    cursor: "default",
  };
  const notActiveStyle = {
    cursor: "pointer",
  };

  return (
    <>
      <div className="process">
        <div className="process-step">
          <div className="process-img">
            <img
              src={p1}
              alt="cart"
              id="cart"
              style={
                pathname === "/Cart" || pathname === "/checkout"
                  ? activeStyle
                  : notActiveStyle
              }
            />
          </div>
          <p>CART</p>
        </div>
        <div className="line"></div>
        <div className="process-step">
          <div className="process-img">
            <img
              src={p2}
              alt="cart"
              style={pathname === "/checkout" ? activeStyle : notActiveStyle}
            />
          </div>
          <p>CHECKOUT</p>
        </div>
        <div className="line"></div>
        <div className="process-step">
          <div className="process-img">
            <img src={p3} alt="cart" />
          </div>
          <p>PAYMENT</p>
        </div>
      </div>
    </>
  );
}
