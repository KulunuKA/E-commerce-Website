import React, { useState } from "react";
import MyInput from "../../Component/input copy";
import Dropdown from "../../Component/Dropdown";
import { Switch, Upload, Button, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import MyButton from "../Button";

const MAX_FILES = 3;
export default function AddProduct() {
  const [formData, setFormData] = useState({
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
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

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
  const genderOptions = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
  ];

  const handleInputChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = ({ fileList }) => {
    setFormData((prev) => ({ ...prev, images: fileList }));
  };

  const handleSubmit = () => {
    console.log("Submitted Product:", formData);
    message.success("Product submitted successfully");
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none", cursor: "pointer" }}
      type="button"
      aria-label="Upload"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <MyInput
        label="Name"
        value={formData.name}
        onChange={handleInputChange("name")}
        required
      />
      <MyInput
        label="Description"
        value={formData.description}
        onChange={handleInputChange("description")}
        required
      />
      <Dropdown
        label="Gender"
        options={["Male", "Female", "Kids", "Unisex"].map((marital) => ({
          value: marital,
          label: marital,
        }))}
        onChange={(e) => {
          setFormData({ ...formData, gender: e });
        }}
        placeholder="Select gender"
        value={formData.gender}
      />
      <Dropdown
        label="Category"
        options={categories[formData.gender || "Male"].map((category) => ({
          value: category,
          label: category,
        }))}
        onChange={(e) => {
          setFormData({ ...formData, category: e });
        }}
        placeholder="Select category"
        value={formData.category}
        required
      />

      <MyInput
        label="Price"
        type="number"
        value={formData.price}
        onChange={handleInputChange("price")}
        required
      />


      <MyInput
        label="Material"
        value={formData.material}
        onChange={handleInputChange("material")}
        placeholder="Cotton, Polyester, etc."
      />

      <MyInput
        label="Weight (kg)"
        type="number"
        value={formData.weight}
        onChange={handleInputChange("weight")}
      />
      <MyInput
        label="Size"
        value={formData.size}
        onChange={handleInputChange("size")}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <label style={{ fontWeight: "500" }}>Available</label>
        <Switch
          checked={formData.available}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, available: value }))
          }
        />
      </div>

      <MyInput
        label="Stock"
        type="number"
        value={formData.stock}
        onChange={handleInputChange("stock")}
      />

      <div className="addproduct-itemfield">
        <p>Brand logo</p>
        <div className="addproduct-img">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product image(s)</p>
        <div className="addproduct-img">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= MAX_FILES ? null : uploadButton}
          </Upload>
        </div>
      </div>

      <Button type="primary" size="large" onClick={handleSubmit}>
        Submit Product
      </Button>
    </div>
  );
}
