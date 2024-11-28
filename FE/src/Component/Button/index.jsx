import React from "react";
import "./style.css";

export default function Button({ text, height, width }) {
  return (
    <div>
      <button className="common-btn" style={{ height: height, width: width }}>
        {text}
      </button>
    </div>
  );
}
