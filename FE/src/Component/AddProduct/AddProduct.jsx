import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { notification, Select, Switch } from "antd";
import { addProduct } from "../../APIs/adminAPIs";
import { useOneImgUpload } from "../../Hooks/useOneImgUpload";
import Loading from "../Loader/index";

const AddProduct = () => {
  const maritals = ["Cotton", "Silk", "Polyester", "Wool", "Denim"];

  const categories = {
    Male: [
      "T-shirts & Polos",
      "Hoodies",
      "Casual Pants",
      "Jeans & Joggers",
      "Casual Shirts",
      "Formal Shirt",
      "Formal Trousers",
      "Shorts",
      "Active Wear",
      "Pyjama Pants",
    ],

    Female: [
      "Dresses",
      "T-shirts",
      "Blouses & Shirts",
      "Ladies Pants",
      "Jeans",
      "Shorts",
      "Overcoats & Cardigans",
      "Jumpsuit",
      "Skirt",
      "Maternity Wear",
      "Active Wear",
      "Plus Women Wear",
    ],
  };
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    images: [],
    category: "",
    price: "",
    brand: "",
    material: "",
    gender: "",
    weight: "",
    size: "",
    available: true,
    stock: 0,
  });

  const handleProduct = async (e) => {
    e.preventDefault();
    if (!productDetails.name) {
      notification.error({
        message: "Name is required",
      });
    } else if (!productDetails.description) {
      notification.error({
        message: "Description is required",
      });
    } else if (!productDetails.price) {
      notification.error({
        message: "Price is required",
      });
    } else if (!productDetails.brand) {
      notification.error({
        message: "Brand is required",
      });
    } else if (!productDetails.material) {
      notification.error({
        message: "Material is required",
      });
    } else if (!productDetails.size) {
      notification.error({
        message: "Size is required",
      });
    } else if (!productDetails.stock) {
      notification.error({
        message: "Stock is required",
      });
    } else if (productDetails.images.length === 0) {
      notification.error({
        message: "Image is required",
      });
    } else {
      try {
        setIsLoading(true);
        const { data, code, msg } = await addProduct(productDetails);
        if (code === 201) {
          notification.success({
            message: "Product added successfully",
          });
          setProductDetails({
            name: "",
            description: "",
            images: [],
            category: "",
            price: "",
            brand: "",
            material: "",
            gender: "",
            weight: "",
            size: "",
            available: true,
            stock: 0,
          }); // clear the form
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        notification.error({
          message: error.response.msg || "Failed to add product",
        });
      }
    }
  };

  const changeHandler = (filed) => (e) => {
    setProductDetails({ ...productDetails, [filed]: e.target.value });
  };

  const handleBrand = async (file) => {
    try {
      setUploading(true);
      const url = await useOneImgUpload(file);
      setProductDetails({ ...productDetails, brand: url });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      notification.error({
        message: "Failed to upload image",
      });
    }
  };

  const imageHandler = async (e) => {
    try {
      const url = await useOneImgUpload(e.target.files[0]);
      setProductDetails({
        ...productDetails,
        images: [...productDetails.images, url],
      });
    } catch (error) {
      notification.error({
        message: "Failed to upload image",
      });
    }
  };

  let imageInputArray = [];

  for (let i = 0; i < 3; i++) {
    imageInputArray.push(
      <div key={i}>
        <label for="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={
              productDetails.images[i] ? productDetails.images[i] : upload_area
            }
            alt=""
          />
        </label>
        <input
          onChange={(e) => {
            imageHandler(e);
          }}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
    );
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input
          type="text"
          value={productDetails.name}
          onChange={changeHandler("name")}
          placeholder="Type here name"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea
          type="text"
          value={productDetails.description}
          onChange={changeHandler("description")}
          placeholder="description here"
          maxLength={200}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            value={productDetails.price}
            onChange={changeHandler("price")}
            placeholder="Type here"
            min={100}
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Brand Logo</p>
        <label for="file-inputt">
          {!uploading ? (
            <img
              className="addproduct-thumbnail-img"
              src={productDetails.brand ? productDetails.brand : upload_area}
              alt=""
            />
          ) : (
            <Loading size={20} />
          )}
        </label>
        <input
          onChange={(e) => {
            handleBrand(e.target.files[0]);
          }}
          type="file"
          name="image"
          id="file-inputt"
          hidden
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Material</p>
        <Select
          placeholder={"Select a material"}
          options={maritals.map((marital) => ({
            value: marital,
            label: marital,
          }))}
          onChange={(e) => {
            setProductDetails({ ...productDetails, material: e });
          }}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Product gender</p>
        <Select
          placeholder={"Select a gender"}
          options={["Male", "Female", "Kids", "Unisex"].map((marital) => ({
            value: marital,
            label: marital,
          }))}
          onChange={(e) => {
            setProductDetails({ ...productDetails, gender: e });
          }}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Category</p>
        <Select
          placeholder={"Select a category"}
          options={categories[productDetails.gender || "Male"].map(
            (category) => ({
              value: category,
              label: category,
            })
          )}
          onChange={(e) => {
            setProductDetails({ ...productDetails, category: e });
          }}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Weight (g)</p>
        <input
          type="text"
          value={productDetails.weight}
          onChange={changeHandler("weight")}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Size</p>
        <Select
          placeholder={"Select a size"}
          options={["S", "M", "L", "XL", "XXL"].map((marital) => ({
            value: marital,
            label: marital,
          }))}
          onChange={(e) => {
            setProductDetails({ ...productDetails, size: e });
          }}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Available</p>
        <Switch
          style={{ width: "100px" }}
          checkedChildren="Yes"
          unCheckedChildren="No"
          defaultChecked
          onChange={(e) => {
            setProductDetails({ ...productDetails, available: e });
          }}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Stock</p>
        <input
          type="text"
          value={productDetails.stock}
          onChange={changeHandler("stock")}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Product image(s)</p>
        <div className="addproduct-img">{imageInputArray}</div>
      </div>

      <button className="addproduct-btn" onClick={handleProduct}>
        {isLoading ? <Loading size={30} /> : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
