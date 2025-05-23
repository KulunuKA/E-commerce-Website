import React, { useRef } from "react";
import delivery from "../../assets/delivery.png";
import money from "../../assets/money.png";
import shop from "../../assets/shop.png";
import exchange from "../../assets/exchange.png";
import card from "../../assets/card.png";
import dress from "../../assets/dress.png";

const services = [
  {
    img: delivery,
    info: "ISLAND-WIDE DELIVERY",
  },
  {
    img: money,
    info: "CASH ON DELIVERY",
  },
  {
    img: shop,
    info: "ISLAND-WIDE STORE",
  },
  {
    img: exchange,
    info: "EXCHANGE FROM ANY STORE",
  },
  {
    img: card,
    info: "SECURE PAYMENTS",
  },
  {
    img: dress,
    info: "UNLIMITED UNIQUE DESIGN",
  },
];

export default function ServicesSlider() {
  const sliderRef = useRef(null);

  const handleMouseLeave = () => {
    sliderRef.current.style.animationPlayState = "running";
  };

  return (
    <div className="services">
      <div className="servicesInner" ref={sliderRef}>
        {services.map((service, index) => (
          <div className="service" key={index}>
            <div className="serviceImg">
              <img src={service.img} alt="delivery" />
            </div>
            <div className="serviceInfo">
              <p>{service.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
