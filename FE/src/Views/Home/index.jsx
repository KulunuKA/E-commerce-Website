import React, { useState, useEffect } from "react";
import "./style.css";
import heroImg1 from "../../assets/hero-6.jpg";
import heroImg2 from "../../assets/hero-3.jpg";
import heroImg3 from "../../assets/hero-4.jpg";
import heroImg4 from "../../assets/hero-5.jpg";
import delivery from "../../assets/delivery.png";
import money from "../../assets/money.png";
import shop from "../../assets/shop.png";
import exchange from "../../assets/exchange.png";
import card from "../../assets/card.png";
import dress from "../../assets/dress.png";
import cate1 from "../../assets/cate-1.jpg";
import cate2 from "../../assets/cate-2.jpg";
import cate3 from "../../assets/cate-3.jpg";
import { fetchHomeData } from "../../APIs/userAPIs";
import ProductCard from "../../Component/ProductCard";
import banner from "../../assets/banner.jpg";
import sub1 from "../../assets/sub-1.jpg";
import sub2 from "../../assets/sub-2.jpg";
import sub3 from "../../assets/sub-3.jpg";
import sub4 from "../../assets/sub-4.jpg";
import sub5 from "../../assets/sub-5.jpg";
import sub6 from "../../assets/sub-6.jpg";

export default function Home() {
  const heroImg = [heroImg1, heroImg2, heroImg3, heroImg4];
  const [curr, setCurr] = useState(0);
  const [slide, setSlide] = useState(heroImg[curr]);
  const [isErr, setErr] = useState("");
  const services = [
    {
      img: delivery,
      info: "ISLAND-WIDE DELIVERY",
    },
    {
      img: money,
      info: "CASH ON DELIVERY",
    },
    {
      img: shop,
      info: "ISLAND-WIDE STORE",
    },
    {
      img: exchange,
      info: "EXCHANGE FROM ANY STORE",
    },
    {
      img: card,
      info: "SECURE PAYMENTS",
    },
    {
      img: dress,
      info: "UNLIMITED UNIQUE DESIGN",
    },
  ];
  const categories = [
    {
      img: cate1,
      info: "MEN'S",
    },
    {
      img: cate2,
      info: "WOMEN'S",
    },
    {
      img: cate3,
      info: "KIDS",
    },
  ];
  const subCate = [
    {
      img: sub1,
      info: "MEN'S",
    },
    {
      img: sub2,
      info: "WOMEN'S",
    },
    {
      img: sub3,
      info: "KIDS",
    },
    {
      img: sub4,
      info: "BABY",
    },
    {
      img: sub5,
      info: "ACCESSORIES",
    },
    {
      img: sub6,
      info: "SHOES",
    },
  ];
  const [item, setItem] = useState([]);

  //fetching data from the backend
  const fetchItems = async () => {
    try {
      const { data, code, msg } = await fetchHomeData();
      if (code === 200) {
        setItem(data);
      } else {
        console.log(msg);
        setErr("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setErr(" ⚠️ Something went wrong");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newCurr = curr + 1;
      if (newCurr > 3) {
        newCurr = 0;
      }
      setCurr(newCurr);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [curr]);

  useEffect(() => {
    setSlide(heroImg[curr]);
  }, [curr]);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="heroImg">
          <img src={slide} alt="" />
        </div>
      </div>

      {/* Services */}
      <div className="services">
        {services.map((service, index) => (
          <div className="service" key={index}>
            <div className="serviceImg">
              <img src={service.img} alt="delivery" />
            </div>
            <div className="serviceInfo">
              <p>{service.info}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Category */}
      <div className="main-Cate">
        {categories.map((category, index) => (
          <div className="cate" key={index}>
            <div className="cateImg">
              <img src={category.img} alt={category.info} />
            </div>
            <div className="cateInfo">
              <h1>{category.info}</h1>
              <a href="">VIEW COLLECTION</a>
            </div>
          </div>
        ))}
      </div>

      {/* New Arrival */}
      <div className="newArrivals">
        <div className="sub-headers">
          <h1>NEW ARRIVALS</h1>
          <p>
            Bring an edge back into your wardrobe with cool looks you can't do
            without from Fashion Bug, the best place for online clothes
            shopping.
          </p>
        </div>

        {isErr ? (
          <div className="error-div">
            <p className="error-message">{isErr}</p>
          </div>
        ) : (
          <div className="newA-grid">
            {item?.map((e) => (
              <ProductCard id={e._id} key={e._id} {...e} />
            ))}
          </div>
        )}

        <button className="collection">VIEW COLLECTION</button>
      </div>

      <div className="banner">
        <img src={banner} alt="" />
      </div>

      <div className="sub-headers">
        <h1>SHOP BY CATEGORY</h1>
      </div>

      <div className="sub-cate">
        {subCate.map((sub, index) => (
          <div className="cate" key={index}>
            <div className="cateImg sub-img img">
              <img src={sub.img} alt={sub.info} />
            </div>
            <div className=" subInfo">
              <h1>{sub.info}</h1>
              <a href="">VIEW COLLECTION</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
