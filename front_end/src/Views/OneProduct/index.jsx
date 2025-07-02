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
import MyButton from "../../Component/Button";

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
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState({
    fuc1: true,
    fuc2: true,
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [item, setItem] = useState({});
  const [similar, setSimilar] = useState([]);
  let [quantity, setQuantity] = useState(1);
  const reduxUser = useSelector(userData);
  const [askLogin, setAskLogin] = useState(false);
  const dispatch = useDispatch();

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
      if (code === 0) {
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
      console.log("Fetching similar products for category:", item.category);
      const { data, code, msg } = await filterProduct(item.category, 4);
      if (code === 0) {
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
  }, []);

  useEffect(() => {
    if (item.category) fetchSimilar();
  }, [item.category]);

  //Add product to cart
  const handleCart = async () => {
    setBtnLoading(true);
    if (!reduxUser.email) {
      setAskLogin(true);
      setBtnLoading(false);
      return;
    } else if (!size) {
      notification.error({
        message: "Size is required",
      });
      setBtnLoading(false);
      return;
    }

    try {
      const product_id = id;

      const { data, code, msg } = await addCart({product_id}, reduxUser.id);

      if (code === 0) {
        notification.success({
          message: "Product added to cart successfully",
        });

        dispatch(setCartItemCount(data));
      }
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
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
    <div className="product-page">
      {isLoading.fuc1 ? (
        <Loading size={60} />
      ) : (
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-list">
              {item?.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Product ${index}`}
                  onClick={changeImg}
                  className="thumbnail"
                />
              ))}
            </div>
            <div className="main-image">
              <img src={item.images[0]} alt="Main Product" id="imageBox" />
            </div>
          </div>

          <div className="product-info">
            <h3 className="product-title">{item.name}</h3>
            <p className="product-price">LKR {item?.price?.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <p className="image-note">
              *Product image may differ due to photographic lighting*
            </p>

            <div className="brand-info">
              <span>Brand:</span>
              <img src={item.brand} alt="Brand" />
            </div>

            <p>
              <strong>Material:</strong> {item.material}
            </p>
            <p>
              <strong>Weight:</strong> {item.weight}
            </p>

            <div className="payment-offer">
              <p>or 3 installments of {item.price} with</p>
              <img src={pay} alt="Installment Payment" />
            </div>

            <div className="product-size">
              <label>Size</label>
              <Select
                className="size-selector"
                placeholder="Select Size"
                size="large"
                options={sizes.map((e) => ({ value: e, label: e }))}
                onChange={(e) => setSize(e)}
              />
            </div>

            <div className="purchase-actions">
              <div className="quantity-selector">
                <p id="quantity">{quantity}</p>
                <p onClick={countCal}>
                  <i className="bi bi-plus"></i>
                </p>
                <p onClick={countRemove}>
                  <i className="bi bi-dash"></i>
                </p>
              </div>
              <div className="action-buttons">
                <MyButton name="BUY" onClick={handleCheckout} color="#ED1C24" />
                <MyButton
                  name="ADD TO CART"
                  onClick={handleCart}
                  loading={btnLoading}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="related-products">
        <h2 className="section-title">Similar Products</h2>
        {isLoading.fuc2 ? (
          <Loading size={60} />
        ) : (
          <div className="product-grid">
            {similar?.map((e) => (
              <ProductCard key={e.id} {...e} />
            ))}
          </div>
        )}
      </div>

      <SignInModal isOpen={askLogin} closeModal={() => setAskLogin(false)} />
    </div>
  );
}
