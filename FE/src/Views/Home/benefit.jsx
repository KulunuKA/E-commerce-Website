import React from "react";
import cart from "../../assets/cart.png";
import packages from "../../assets/package.png";
import shopping from "../../assets/shopping.png";

export default function Benefit() {
  const benefits = [
    {
      img: cart,
      info: "NEWEST FASHION TRENDS FOR ALL ALIKE Contact us now on online@fashionbug.lk | (+94) 112 633 744",
    },
    {
      img: packages,
      info: "ISLAND WIDE & INTERNATIONAL DELIVERY At your doorstep wherever you are, whenever you need",
    },
    {
      img: shopping,
      info: "UNIQUE BRANDED CLOTHING Incomparably Classy and Unique",
    },
  ];

  return (
    <>
      <div className="benefits">
        {benefits.map((benefit, index) => (
          <div className="benefit" key={index}>
            <div className="benefitImg">
              <img src={benefit.img} alt="cart" />
            </div>
            <div className="benefitInfo">
              <p>{benefit.info}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
