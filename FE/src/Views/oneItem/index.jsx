//One Item view page
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useState } from "react";
import { addCart, filterProduct, getOneProduct } from "../../APIs/userAPIs";
import pay from "../../assets/pay.png";
import ProductCard from "../../Component/ProductCard";
import Loading from "../../Component/Loader";
import { notification, Select } from "antd";
import { setCartItemCount, userData } from "../../Store/user";
import { useDispatch, useSelector } from "react-redux";
import SignInModal from "../../Component/SignInModal";

export default function OneItem() {
  const params = useParams();
  const id = params.id;
  const options = [
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "16", label: "16" },
    { value: "18", label: "18" },
    { value: "20", label: "20" },
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [showSelect, setShowSelect] = useState(options[0]);
  const [isLoading, setIsLoading] = useState({
    fuc1: true,
    fuc2: true,
  });
  const [item, setItem] = useState({});
  const [similar, setSimilar] = useState([]);
  let [quantity, setQuantity] = useState(1);
  const reduxUser = useSelector(userData);
  const [askLogin, setAskLogin] = useState(false);
  const dispatch = useDispatch();

  function selectOne(e) {
    setShowSelect(e);
  }
  function countCal() {
    setQuantity((quantity = quantity + 1));
  }
  function countRemove() {
    setQuantity((quantity = quantity - 1));
  }
  function changeImg(e) {
    let mainImage = document.getElementById("imageBox");
    mainImage.src = e.target.src;
  }

  //get product from database

  const fetchData = async () => {
    try {
      const { data, code, msg } = await getOneProduct(id);
      if (code === 200) {
        setItem(data);
      }
      setIsLoading({ ...isLoading, fuc1: false });
    } catch (error) {
      console.log(error);
      setIsLoading({ ...isLoading, fuc1: false });
    }
  };

  const fetchSimilar = async () => {
    try {
      const { data, code, msg } = await filterProduct(item.category, 4);
      if (code === 200) {
        setSimilar(data);
      }
      setIsLoading({ ...isLoading, fuc2: false });
    } catch (error) {
      console.log(error);
      setIsLoading({ ...isLoading, fuc2: false });
    }
  };

  useEffect(() => {
    fetchData();

    if (item.category) fetchSimilar();
  }, []);

  //Add product to cart
  const handleCart = async (event) => {
    event.preventDefault();

    if (!reduxUser.email) {
      setAskLogin(true);
      return;
    }

    try {
      const submitData = {
        price: item.price,
        quantity: quantity,
      };
      const { data, code, msg } = await addCart(submitData, id);

      if (code === 201) {
        notification.success({
          message: "Product Added",
        });
        dispatch(setCartItemCount(quantity));
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Something went wrong",
      });
    }
  };
  //When Buy product , redirect to checkout page
  const checkoutData = {
    price: item.price,
    title: item.title,
  };
  const handleCheckout = () => {
    // history.push({
    //   pathname: "/checkout",
    //   state: checkoutData,
    // });
  };

  return (
    <div className="product">
      {isLoading.fuc1 ? (
        <Loading size={60} />
      ) : (
        <div className="product-container">
          <div className="productImages">
            <div className="p-sub-img">
              {item?.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`img ${index}`}
                  onClick={changeImg}
                />
              ))}
            </div>
            <div className="p-main-img">
              <img src={item.images[0]} alt="main product" id="imageBox" />
            </div>
          </div>

          <div className="productDetails">
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <p>{item.description}</p>
            <p className="note">
              *Product image may differ from actual due to photographic
              lighting*
            </p>

            <div className="brand">
              <p>Brand:</p>
              <img src={item.brand} alt="Brand logo" />
            </div>

            <p>
              <span>Material: </span>
              {item.material}
            </p>
            <p>
              <span>Weight: </span>
              {item.weight}
            </p>

            <div className="offer">
              <p>or 3 installments of {item.price} with</p>
              <img src={pay} alt="payment option" />
            </div>

            <div className="size">
              <p>Size</p>
              <Select
                defaultValue={sizes[0]}
                size="large"
                options={sizes.map((e) => ({
                  value: e,
                  label: e,
                }))}
                onChange={(e) => selectOne({ value: e.label })}
              />
            </div>

            <div className="addProduct">
              <div className="quantity-control">
                <p id="pieces">{quantity}</p>
                <p onClick={countCal}>
                  <i className="bi bi-plus"></i>
                </p>
                <p onClick={countRemove}>
                  <i className="bi bi-dash"></i>
                </p>
              </div>
              <div className="actions">
                <button onClick={handleCheckout}>BUY</button>
                <button type="submit" onClick={handleCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="similar-products">
        <div className="sub-headers">
          <h1>Similar Products</h1>
        </div>

        {isLoading.fuc2 ? (
          <Loading size={60} />
        ) : (
          <div className="newA-grid">
            {similar?.map((e) => (
              <ProductCard
                id={e._id}
                key={e._id}
                mainImg={e.mainImg}
                mainTitle={e.mainTitle}
                addPrice={e.addPrice}
              />
            ))}
          </div>
        )}
      </div>

      <SignInModal isOpen={askLogin} closeModal={() => setAskLogin(false)} />
    </div>
  );
}
