import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function SignInModal({ isOpen, closeModal }) {
  const navigate = useNavigate();

  return (
    <>
      <Modal open={isOpen} footer={false} onCancel={closeModal}>
        <div className="signModal">
          <h3>Please login in</h3>
          <p>
            Please login in to access more features in Fashion Hub. <br />
            Do you want to login in?
          </p>
          <div className="signBtns">
            <button onClick={closeModal}>No,Cancel</button>
            <button onClick={() => navigate("/login")}>Yes,Continue</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
