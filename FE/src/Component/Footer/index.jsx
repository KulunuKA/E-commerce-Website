import React from "react";
import "./style.css";
import payment from "../../assets/payment/payment.png";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer1">
          <img src="../Images/logo-0.png" alt="" id="logo" />
          <h4>Don't be shy, Come say hi.!</h4>
          <div className="socialMedia">
            <a href="">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="">
              <i className="bi bi-tiktok"></i>
            </a>
            <a href="">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="footer1">
          <p>OUR MENU</p>
          <a href="">Rice & Risottos</a>
          <a href=""> Buddha Bowls</a>
          <a href="">Ovenbakes</a>
          <a href="">Breakfast</a>
          <a href=""> Soups & Stews</a>
          <a href="">Desserts</a>
          <a href=""> Add-ons</a>
        </div>
        <div className="footer1">
          <p>ABOUT FashionHub.</p>
          <a href="">Our story</a>
          <a href="">Our 7 values</a>
          <a href="">Shock-freezing</a>
          <a href="">Every. Magazine</a>
          <a href="">Sustainability</a>
          <div className="f-payment">
            <p>WE ACCEPT</p>
            <div className="payment-logo">
              <img src={payment} alt="" />
            </div>
          </div>
        </div>
        <div className="footer1">
          <p>COMMUNITY</p>
          <a href="">Facebook Community</a>
          <a href="">Refer a friend</a>
          <a href="">Reviews</a>
          <a href="">Careers</a>
          <a href="">Log in</a>
        </div>
        <div className="footer1">
          <p>HELP</p>
          <a href="">FAQ & Contact</a>
          <a href="">Tracking</a>
          <a href="">StudentBeans</a>
          <a href="">B2B</a>
        </div>
      </div>
      <div className="design">
        <p>
          Copyright © 2023 - FashionHub - All Rights Reserved. Concept, Design &
          Development by Kulunu
        </p>
      </div>
    </>
  );
}
