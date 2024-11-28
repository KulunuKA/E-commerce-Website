import React, { useEffect, useState } from "react";
import "./style.css";
import CheckOutProcess from "../../Component/CheckOutProcess/index";
import { getCart } from "../../APIs/userAPIs";
import { userData } from "../../Store/user";
import { useSelector } from "react-redux";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const reduxUser = useSelector(userData);
  const id = reduxUser.id;

  const getCartIDs = async () => {
    try {
      const {data,msg,code} = await getCart(id);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartIDs();
  }, []);

  return (
    <>
      <div className="cart">
        <div className="cart-title">
          <h1>CART</h1>
        </div>
        <CheckOutProcess />
        <p id="p">MY SHOPPING CART</p>
        <div className="tr">
          <tr>
            <th className="main">PRODUCT</th>
            <th className="price">PRICE</th>
            <th className="quantity">QUANTITY</th>
            <th className="subtotal">SUBTOTAL</th>
          </tr>
        </div>
      </div>
    </>
  );
}
