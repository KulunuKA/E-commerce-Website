import React, { useEffect, useState } from "react";
import "./style.css";
import CheckOutProcess from "../../Component/CheckOutProcess/index";
import Loading from "../../Component/Loader/index";
import { deleteCart, getCart } from "../../APIs/userAPIs";
import { removeCartItemCount, userData } from "../../Store/user";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import ErrorDisplay from "../../Component/ErrorDisplay";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const reduxUser = useSelector(userData);
  const id = reduxUser.id;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const getCartIDs = async () => {
    try {
      setIsLoading(true);
      setIsError("");
      const { data, msg, code } = await getCart(id);
      if (code === 200) {
        setCart(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.response.data.msg || "Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsError("");
      const { data, msg, code } = await deleteCart(id);
      if (code === 200) {
        notification.success({
          message: "Deleted!",
        });
        dispatch(removeCartItemCount(data.items[0].quantity));
        getCartIDs();
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
                {cart
                  ?.filter((item) => item.status === "active")
                  .map((item) =>
                    item.items.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image}
                            alt="product"
                            className="cart-item-img"
                          />
                        </td>
                        <td>{product?.name?.toLowerCase()}</td>
                        <td>LKR {product?.price?.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>
                          LKR {(product.price * product.quantity).toFixed(2)}
                        </td>
                        <td>
                          <DeleteOutlined
                            twoToneColor="#52c41a"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item._id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
            <div className="cart-checkOut">
              <button className="checkout-btn" onClick={()=>navigate("/checkout")}>CHECKOUT</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
