import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import logo from "../../assets/logo-0.png";
import { userData } from "../../Store/user";
import { useSelector } from "react-redux";

// import Breadcrumbs from './Breadcrumbs ';

export default function NavBar() {
  const [showList, setShowList] = useState(false);
  const [showWomenList, setShowWomenList] = useState(false);
  const [showKidsList, setShowKidsList] = useState(false);
  const [image, setImage] = useState(
    "https://d1hj68zhrbkzii.cloudfront.net/wp-content/uploads/2022/05/225x340px-Gents-12-min.jpg"
  );

  const reduxUser = useSelector(userData);
  const count = reduxUser?.cartItemCount || 0;

  const menCate = [
    {
      category: "CLOTHING",
      subCategory: [
        {
          name: "All Clothing",
          image:
            "https://fbpros3v1.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2024/10/0203210880GRY-1_Men_T-Shirt_Sri-Lanka_Fashion-Bug.jpg",
        },
        {
          name: "T-shirts & Polos",
          image:
            "https://fbpros3v1.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2024/11/0203211904WHT-3_Mens-T-Shirt_Fashion-Bug-Sri-Lanka-1.jpg",
        },
        {
          name: "Hoodies",
          image: "https://via.placeholder.com/150?text=Hoodies",
        },
        {
          name: "Casual Pants",
          image: "https://via.placeholder.com/150?text=Casual+Pants",
        },
        {
          name: "Shorts",
          image: "https://via.placeholder.com/150?text=Shorts",
        },
        {
          name: "Sportswear",
          image: "https://via.placeholder.com/150?text=Sportswear",
        },
        {
          name: "Formal Trousers",
          image: "https://via.placeholder.com/150?text=Formal+Trousers",
        },
      ],
    },
    {
      category: "ACCESSORIES",
      subCategory: [
        {
          name: "All Accessories",
          image: "https://via.placeholder.com/150?text=All+Accessories",
        },
        {
          name: "Footwear",
          image: "https://via.placeholder.com/150?text=Footwear",
        },
        {
          name: "Hats & Caps",
          image: "https://via.placeholder.com/150?text=Hats+%26+Caps",
        },
      ],
    },
    {
      category: "INNERWEAR",
      subCategory: [
        {
          name: "All Innerwear",
          image: "https://via.placeholder.com/150?text=All+Innerwear",
        },
        {
          name: "Boxers & Briefs",
          image: "https://via.placeholder.com/150?text=Boxers+%26+Briefs",
        },
        {
          name: "Socks",
          image: "https://via.placeholder.com/150?text=Socks",
        },
        {
          name: "Undershirts",
          image: "https://via.placeholder.com/150?text=Undershirts",
        },
      ],
    },
    {
      category: "ETHNICWEAR",
      subCategory: [
        {
          name: "All Ethnicwear",
          image: "https://via.placeholder.com/150?text=All+Ethnicwear",
        },
        {
          name: "Sarong",
          image: "https://via.placeholder.com/150?text=Sarong",
        },
      ],
    },
  ];

  const womenCate = [
    {
      category: "CLOTHING",
      subCategory: [
        {
          name: "All Clothing",
          image: "https://via.placeholder.com/150?text=All+Clothing",
        },
        {
          name: "Dresses",
          image: "https://via.placeholder.com/150?text=Dresses",
        },
        {
          name: "Long Tops",
          image: "https://via.placeholder.com/150?text=Long+Tops",
        },
        {
          name: "Crop Tops & T-shirts",
          image: "https://via.placeholder.com/150?text=Crop+Tops+%26+T-shirts",
        },
        {
          name: "Blouses & Shirts",
          image: "https://via.placeholder.com/150?text=Blouses+%26+Shirts",
        },
        {
          name: "Ladies Pants",
          image: "https://via.placeholder.com/150?text=Ladies+Pants",
        },
        {
          name: "Jeans",
          image: "https://via.placeholder.com/150?text=Jeans",
        },
        {
          name: "Shorts",
          image: "https://via.placeholder.com/150?text=Shorts",
        },
        {
          name: "Jumpsuit",
          image: "https://via.placeholder.com/150?text=Jumpsuit",
        },
        {
          name: "Skirt",
          image: "https://via.placeholder.com/150?text=Skirt",
        },
      ],
    },
    {
      category: "ACCESSORIES",
      subCategory: [
        {
          name: "All Accessories",
          image: "https://via.placeholder.com/150?text=All+Accessories",
        },
        {
          name: "Hand Bags & Wallets",
          image: "https://via.placeholder.com/150?text=Hand+Bags+%26+Wallets",
        },
        {
          name: "Scarfs & Shawls",
          image: "https://via.placeholder.com/150?text=Scarfs+%26+Shawls",
        },
      ],
    },
    {
      category: "COSMETICS",
      subCategory: [
        {
          name: "Footwear",
          image: "https://via.placeholder.com/150?text=Footwear",
        },
        {
          name: "Watches",
          image: "https://via.placeholder.com/150?text=Watches",
        },
        {
          name: "Perfume",
          image: "https://via.placeholder.com/150?text=Perfume",
        },
      ],
    },
    {
      category: "ETHNIC WEAR",
      subCategory: [
        {
          name: "All Ethnicwear",
          image: "https://via.placeholder.com/150?text=All+Ethnicwear",
        },
        {
          name: "Saree",
          image: "https://via.placeholder.com/150?text=Saree",
        },
        {
          name: "Kurthis",
          image: "https://via.placeholder.com/150?text=Kurthis",
        },
      ],
    },
  ];

  const kidsCate = [
    {
      category: "BOYS (2-16 YEARS)",
      subCategory: [
        {
          name: "All Boys (2-16 years)",
          image: "https://via.placeholder.com/150?text=All+Boys+(2-16+years)",
        },
        {
          name: "Shirt",
          image: "https://via.placeholder.com/150?text=Shirt",
        },
        {
          name: "T-shirt",
          image: "https://via.placeholder.com/150?text=T-shirt",
        },
        {
          name: "Pant",
          image: "https://via.placeholder.com/150?text=Pant",
        },
        {
          name: "Short",
          image: "https://via.placeholder.com/150?text=Short",
        },
      ],
    },
    {
      category: "GIRLS (2-16 YEARS)",
      subCategory: [
        {
          name: "All Girls (2-16 years)",
          image: "https://via.placeholder.com/150?text=All+Girls+(2-16+years)",
        },
        {
          name: "T-Shirt",
          image: "https://via.placeholder.com/150?text=T-Shirt",
        },
        {
          name: "Dresses",
          image: "https://via.placeholder.com/150?text=Dresses",
        },
        {
          name: "Jumpsuits & Rompers",
          image: "https://via.placeholder.com/150?text=Jumpsuits+%26+Rompers",
        },
      ],
    },
    {
      category: "KIDS & BABY ACCESSORIES",
      subCategory: [
        {
          name: "Footwear",
          image: "https://via.placeholder.com/150?text=Footwear",
        },
      ],
    },
    {
      category: "TOYS & GAMES",
      subCategory: [
        {
          name: "Hot Wheels",
          image: "https://via.placeholder.com/150?text=Hot+Wheels",
        },
        {
          name: "Other Toys",
          image: "https://via.placeholder.com/150?text=Other+Toys",
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <div className="navbar1">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="navItem">
            <div className="search">
              <input type="text" placeholder="Search product..." />
              <a href="">
                <i className="bi bi-search"></i>
              </a>
            </div>
            <div className="sign-login">
              {reduxUser.email ? (
                <p>
                  <a href="">My Account</a>
                </p>
              ) : (
                <p>
                  <a href="/login">Sign In / Login</a>
                </p>
              )}
            </div>
            <div className="navIcon">
              <a href="">
                <i className="bi bi-heart-fill"></i>
              </a>

              <div className="cart-icon">
                <a href="/cart">
                  <i className="bi bi-cart-fill"></i>
                </a>
                <p>{count} Item</p>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar2">
          <div className="navItem2">
            <div className="category">
              <p>Sale</p>
            </div>

            {/* Men Section */}
            <div
              className="category"
              id="categoryInfo"
              onMouseEnter={() => {
                setShowList(true);
              }}
              onMouseLeave={() => {
                setShowList(false);
                setImage(
                  "https://d1hj68zhrbkzii.cloudfront.net/wp-content/uploads/2022/05/225x340px-Gents-12-min.jpg"
                );
              }}
            >
              <p>
                Men <i className="bi bi-chevron-right"></i>
              </p>

              {showList && (
                <div className="categoryInfo">
                  <div className="categoryImg">
                    <img src={image} alt="" />
                  </div>
                  <div className="categoryList">
                    {menCate.map((item,index) => (
                      <div className="categoryList1" key={index}>
                        <p>{item.category}</p>
                        <ul>
                          {item.subCategory.map((subItem , index) => (
                            <li key={index}>
                              <a
                                href=""
                                onMouseEnter={() => setImage(subItem.image)}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Women Section */}

            <div
              className="category"
              onMouseEnter={() => {
                setShowWomenList(true);
              }}
              onMouseLeave={() => {
                setShowWomenList(false);
              }}
            >
              <p>
                Women<i className="bi bi-chevron-right"></i>
              </p>
              {showWomenList && (
                <div className="categoryInfo">
                  <div className="categoryImg">
                    <img
                      src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTK6zGAS_Soe_e0Bx4SHH_QCEBFKnJBMptVxYv7Stn1j3NDyw3L"
                      alt=""
                    />
                  </div>
                  <div className="categoryList">
                    {womenCate.map((item,index) => (
                      <div className="categoryList1" key={index}>
                        <p>{item.category}</p>
                        <ul>
                          {item.subCategory.map((subItem,index) => (
                            <li key={index}>
                              <a
                                href=""
                                onMouseEnter={() => setImage(subItem.image)}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kids Section */}
            <div
              className="category"
              onMouseEnter={() => {
                setShowKidsList(true);
              }}
              onMouseLeave={() => {
                setShowKidsList(false);
              }}
            >
              <p>
                {" "}
                Kids & Baby<i className="bi bi-chevron-right"></i>
              </p>
              {showKidsList && (
                <div className="categoryInfo">
                  <div className="categoryImg">
                    <img src={image} alt="" />
                  </div>
                  <div className="categoryList">
                    {kidsCate.map((item,index) => (
                      <div className="categoryList1" key={index}>
                        <p>{item.category}</p>
                        <ul>
                          {item.subCategory.map((subItem,index) => (
                            <li key={index}>
                              <a
                                href=""
                                onMouseEnter={() => setImage(subItem.image)}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="category">
              <p style={{ Color: "red" }}>
                <a to="/NewArrivals">New Arrivals</a>
              </p>
            </div>
          </div>
          <div className="helps">
            <p>Need Help?</p>
            <a href="">
              <i className="bi bi-telephone-fill"></i>
            </a>
            <a href="">
              <i className="bi bi-envelope-fill"></i>
            </a>
          </div>
        </div>
        {/* <Breadcrumbs /> */}
      </div>
    </>
  );
}
