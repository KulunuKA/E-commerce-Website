import React, { useState } from "react";
import MyInput from "../../Component/input copy";
import Dropdown from "../../Component/Dropdown";
import { Switch, Upload, Button, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import MyButton from "../../Component/Button";
import { StyledAdminContainer } from "../../utils/styled";
import { useOneImgUpload } from "../../hooks/useOneImgUpload";
import { addProduct } from "../../APIs/adminAPIs";
import { use } from "react";

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
  const [fileList, setFileList] = useState({
    images: [],
    brand: [],
  });
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleInputChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const useMultiImgUpload = async (files) => {
    const urls = [];

    for (const file of files) {
      const url = await useOneImgUpload(file);
      urls.push(url);
    }

    return urls;
  };

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.material) newErrors.material = "Material is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (formData.price < 0) newErrors.price = "Price cannot be negative";
    if (formData.weight < 0) newErrors.weight = "Weight cannot be negative";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const images = fileList.images
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj);

      const brandImg = await useOneImgUpload(
        fileList.brand.length > 0 ? fileList.brand[0].originFileObj : null
      );

      const newImages = await useMultiImgUpload(images);

      let updateFormData = {
        ...formData,
        images: newImages,
        brand: brandImg,
      };

      if (!validateForm(updateFormData)) {
        setIsLoading(false);
        message.error("Please fill all required fields");
        return;
      }

      const { data, message: msg, code } = await addProduct(updateFormData);

      if (code === 0) {
        message.success(msg);
        setFormData({
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
        setFileList({ images: [], brand: [] });
        setPreviewImage("");
      } else {
        message.error(msg);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to update product");
      console.error("Error updating product:", error);
    }
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
    setFileList((prev) => ({ ...prev, images: newFileList }));
  };

  const bandImgChange = ({ fileList: newBrandFileList }) => {
    setFileList((prev) => ({ ...prev, brand: newBrandFileList }));
    setFormData((prev) => ({ ...prev, brand: newBrandFileList[0] }));
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
    <StyledAdminContainer>
      <h1>Add Product</h1>
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
              onChange={bandImgChange}
              fileList={fileList.brand}
              accept="image/*"
              multiple={false}
            >
              {fileList.brand.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
        </div>

        <div className="addproduct-itemfield">
          <p>Product image(s)</p>
          <div className="addproduct-img">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList.images}
              accept="image/*"
              onPreview={handlePreview}
              onChange={handleChange}
              multiple
            >
              {fileList.images.length >= MAX_FILES ? null : uploadButton}
            </Upload>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <MyButton
            name="Add"
            onClick={handleSubmit}
            loading={isLoading}
            width={150}
          />
        </div>
      </div>
    </StyledAdminContainer>
  );
}
