import React from "react";
import "./style.css";
import errorIcon from "../../assets/warning.png"; // Add a suitable error icon to your project

export default function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <img src={errorIcon} alt="Error" className="error-icon" />
        <p className="error-message">
          {message || "Something went wrong. Please try again."}
        </p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
