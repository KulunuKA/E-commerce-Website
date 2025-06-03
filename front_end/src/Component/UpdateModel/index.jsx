import React, { useEffect, useState } from "react";
import MyInput from "../../Component/input copy";
import Dropdown from "../../Component/Dropdown";
import { Switch, Upload, Button, message, Modal } from "antd";
import { DeleteFilled, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import MyButton from "../Button";
import { deleteProduct, updateProducts } from "../../APIs/adminAPIs";
import { useOneImgUpload } from "../../hooks/useOneImgUpload";
import { Delete } from "lucide-react";

const MAX_FILES = 3;

export default function UpdateProduct({ selectedProduct, onCancel, isOpen }) {
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
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleInputChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [key]: value }));
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

  const useMultiImgUpload = async (files) => {
    const urls = [];

    for (const file of files) {
      const url = await useOneImgUpload(file);
      urls.push(url);
    }

    return urls;
  };

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const { data, code, message: msg } = await deleteProduct(id);
      if (code === 0) {
        message.success(msg);
        onCancel(data, "delete");
      } else {
        message.error(msg);
      }
      setIsDeleteLoading(false);
    } catch (error) {
      setIsDeleteLoading(false);
      message.error("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };

  // This function handles the submission of the form data
  const handleSubmit = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const images = fileList
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj);

      const existingImages = fileList
        .filter((file) => !file.originFileObj)
        .map((file) => file.url || file.preview);

      const newImages = await useMultiImgUpload(images);

      let updateFormData = {
        ...formData,
        images: [...existingImages, ...newImages],
      };

      if (!validateForm(updateFormData)) {
        message.error("Please fill all required fields");
        return;
      }

      const {
        data,
        message: msg,
        code,
      } = await updateProducts(id, updateFormData);

      if (code === 0) {
        message.success(msg);
        onCancel(data, "update");
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

  // This function converts a file to a base64 string for preview purposes
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

  useEffect(() => {
    if (selectedProduct) {
      const transformedImages = (selectedProduct.images || []).map(
        (img, index) => ({
          uid: String(index),
          name: `image-${index}`,
          status: "done",
          url: typeof img === "string" ? img : img?.url,
        })
      );
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
        price: selectedProduct.price || "",
        brand: selectedProduct.brand || "",
        material: selectedProduct.material || "",
        gender: selectedProduct.gender || "",
        weight: selectedProduct.weight || "",
        size: selectedProduct.size || "",
        available: selectedProduct.available || true,
        stock: selectedProduct.stock || 0,
      });

      setFileList(transformedImages || []);
      setId(selectedProduct.id || "");
    }
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
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
      setFileList([]);
      setError(null);
      setId("");
    };
  }, []);
  return (
    <Modal
      title="Update Product"
      open={isOpen}
      onCancel={onCancel}
      onClose={onCancel}
      footer={null}
      width={800}
      centered
    >
      <div
        style={{
          maxWidth: "800px",
          height: "80vh",
          margin: "0 auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          overflowY: "auto",
        }}
      >
        <MyInput
          label="Name"
          value={formData.name}
          onChange={handleInputChange("name")}
          placeholder="Product name"
          error={error?.name}
          errorMessage={error?.name}
          required
        />
        <MyInput
          label="Description"
          value={formData.description}
          onChange={handleInputChange("description")}
          placeholder="Product description"
          error={error?.description}
          errorMessage={error?.description}
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
          error={error?.gender}
          errorMessage={error?.gender}
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
          error={error?.category}
          errorMessage={error?.category}
          required
        />

        <MyInput
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleInputChange("price")}
          required
          error={error?.price}
          errorMessage={error?.price}
        />

        <MyInput
          label="Material"
          value={formData.material}
          onChange={handleInputChange("material")}
          placeholder="Cotton, Polyester, etc."
          error={error?.material}
          errorMessage={error?.material}
        />

        <MyInput
          label="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={handleInputChange("weight")}
          placeholder="Product weight"
          error={error?.weight}
          errorMessage={error?.weight}
        />
        <MyInput
          label="Size"
          value={formData.size}
          onChange={handleInputChange("size")}
          placeholder="Product size"
          error={error?.size}
          errorMessage={error?.size}
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
          placeholder="Available stock"
          error={error?.stock}
          errorMessage={error?.stock}
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
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= MAX_FILES ? null : uploadButton}
            </Upload>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <MyButton
            name="Delete"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this product?",
                content: "This action cannot be undone.",
                onOk: () => {
                  handleDelete();
                },
              });
            }}
            width={100}
            color={"#ED1C24"}
            icon={<DeleteFilled />}
            loading={isDeleteLoading}
          />

          <MyButton
            name="Update"
            onClick={handleSubmit}
            width={100}
            loading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}
