import React, { useEffect, useState } from "react";
import "./style.css";
import CheckOutProcess from "../../Component/CheckOutProcess/index";
import Loading from "../../Component/Loader/index";
import { deleteCart, getCart } from "../../APIs/userAPIs";
import { cartItems, removeCartItem, userData } from "../../Store/user";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import ErrorDisplay from "../../Component/ErrorDisplay";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const reduxUser = useSelector(userData);
  const id = reduxUser.id;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const reduxCart = useSelector(cartItems);
  const cart_id = reduxCart.id;
  const [cart, setCart] = useState(reduxCart.items || []);

  const getCartIDs = async () => {
    try {
      setIsLoading(true);
      setIsError("");
      const { data, msg, code } = await getCart(id);
      if (code === 0) {
        setCart(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.response.data.msg || "Something went wrong!");
    }
  };

  const handleDelete = async (productId) => {
    try {
      setIsError("");
      const { data, msg, code } = await deleteCart(cart_id, productId);
      if (code === 0) {
        notification.success({
          message: "Item removed from cart successfully!",
        });
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId !== productId)
        );
        dispatch(removeCartItem(data));
      } else {
        notification.error({
          message: "Try again!",
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.msg || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className="cart">
        <div className="cart-title">
          <h1>CART</h1>
        </div>
        <CheckOutProcess />
        <p id="p">MY SHOPPING CART ({`${cart?.length} items`})</p>
        {isLoading ? (
          <Loading size={50} />
        ) : isError ? (
          <ErrorDisplay message={isError} onRetry={() => getCart()} />
        ) : (
          <div className="cart-div">
            <table className="cartTable">
              <thead>
                <tr className="tableH">
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img
                        src={item.image}
                        alt="product"
                        className="cart-item-img"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>LKR {item?.price?.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>LKR {(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <DeleteOutlined
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          Modal.confirm({
                            title: "Are you sure you want to delete this item?",
                            onOk: () => handleDelete(item.productId),
                            onCancel: () => console.log("Cancelled"),
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-checkOut">
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
