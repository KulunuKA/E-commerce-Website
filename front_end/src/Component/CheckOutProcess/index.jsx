import React from "react";
import "./style.css";
import p1 from "../../assets/Process/p-1.png";
import p2 from "../../assets/Process/p-2.png";
import p3 from "../../assets/Process/p-3.png";

export default function CheckOutProcess() {
  const pathname = window.location.pathname;

  const steps = [
    { path: "/cart", label: "CART", img: p1 },
    { path: "/checkout", label: "CHECKOUT", img: p2 },
    { path: "/payment", label: "PAYMENT", img: p3 },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="process">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="process-step">
            <div
              className={`process-img ${isActive(step.path) ? "active" : ""}`}
            >
              <img
                src={step.img}
                alt={step.label.toLowerCase()}
                aria-current={isActive(step.path) ? "step" : undefined}
              />
            </div>
            <p
              className={`process-label ${isActive(step.path) ? "active" : ""}`}
            >
              {step.label}
            </p>
          </div>
          {index < steps.length - 1 && <div className="line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}
