//CheckOut page
import React, { useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import CheckOutProcess from "../../Component/CheckOutProcess/index";
import { Select } from "antd";
import payment1 from "../../assets/payment/p-1.png";
import payment2 from "../../assets/payment/p-2.png";
import payment3 from "../../assets/payment/p-3.png";

export default function CheckOut() {
  const location = useLocation();
  const check = location.state;

  const options = [
    { value: "Ampara", label: "Ampara" },
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Badulla", label: "Badulla" },
    { value: "Batticaloa8", label: "Batticaloa" },
    { value: "Colombo", label: "Colombo" },
    { value: "Galle", label: "Galle" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Hambantota", label: "Hambantota" },
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kalutara", label: "Kalutara" },
    { value: "Kandy", label: "Kandy" },
    { value: "Kegalla", label: "Kegalla" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Mannar", label: "Mannar" },
    { value: "Matale", label: "Matale" },
    { value: "Matara", label: "Matara" },
    { value: "Moneragala", label: "Moneragala" },
    { value: "Mullaitivu", label: "Mullaitivu" },
    { value: "Nuwara Eliya	", label: "Nuwara Eliya	" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
    { value: "Puttalam", label: "Puttalam" },
    { value: "Ratnapura", label: "Ratnapura" },
    { value: "Trincomalee", label: "Trincomalee" },
    { value: "Vavuniya", label: "Vavuniya" },
  ];

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [companyName, setCompanyName] = useState();
  const [phone, setPhone] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [postcode, setPostCode] = useState();

  const handleSubmit = async () => {};

  return (
    <>
      <div className="checkOut-title">
        <h1>CHECKOUT</h1>
      </div>

      <CheckOutProcess />
      <form onSubmit={handleSubmit}>
        <div className="checkOut">
          <div className="CO-body">
            <div className="CO-details">
              <p>BILLING DETAILS</p>
              <p>
                <span>NOTICE : </span>The payments of all the orders that are
                shipped from Sri Lanka to overseas can only be made in USD.
              </p>
            </div>
            <div className="CO-form">
              <form>
                <div className="name">
                  <div className="name-input1">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="name-input2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="companyName">
                  <label>Company name (optional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </div>
                <div className="telephone">
                  <div className="name-input1">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="name-input2">
                    <label>Secondary phone</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="district">
                  <label>District</label>
                  <Select
                    style={{ width: "50%" }}
                    options={options}
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                  />
                </div>
                <div className="City">
                  <label>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div className="address">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="postcode">
                  <label>Postcode/ZIP</label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => {
                      setPostCode(e.target.value);
                    }}
                  />
                </div>
                <div className="co-Email">
                  <label>Email</label>
                  <input type="email" />
                </div>
              </form>
            </div>
          </div>
          <div className="payment">
            <p>YOUR ORDER</p>
            <table>
              <tr>
                <td className="co-td">{check?.title} × 1</td>
                <td>{check?.price}</td>
              </tr>
              <tr>
                <td className="co-td">Subtotal</td>
                <td>{check?.price}</td>
              </tr>
              <tr>
                <td className="co-td">Shipping</td>
                <td>Rs. 350.00</td>
              </tr>
              <tr>
                <td className="co-td">Total</td>
                <td id="total">Rs </td>
              </tr>
            </table>
            <div className="payment-Option">
              <div className="p-method">
                <input type="radio" />
                <label>Cash on delivery</label>
              </div>
              <div className="p-method">
                <input type="radio" />
                <label>Credit/Debit Card</label>
                <img src={payment1} alt="" id="visa" />
              </div>
              <div className="p-method">
                <input type="radio" />
                <label>Koko: Buy Now Pay Later</label>
                <img src={payment2} alt="" id="koko" />
              </div>
              <div className="p-method">
                <input type="radio" />
                <label>Mintpay</label>
                <img src={payment3} alt="" />
              </div>
              <button type="submit">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
