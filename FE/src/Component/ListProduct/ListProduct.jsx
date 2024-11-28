import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";
import { getProducts, updateAvailabilityProduct } from "../../APIs/adminAPIs";
import { notification, Switch } from "antd";
import Loading from "../Loader";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    try {
      const { code, data, msg } = await getProducts();
      if (code === 200) {
        setAllProducts(data);
      } else {
        console.log(msg);
      }
    } catch (error) {
      setError(error.response.data.msg || "Failed to fetch products");
    }
  };

  const handleAvailability = async (id, available) => {
    try {
      const { code, data, msg } = await updateAvailabilityProduct(id, {
        available: !available,
      });
      if (code === 200) {
        notification.success({
          message: "Availability updated successfully",
        });
        fetchInfo();
      } else {
        notification.error({
          message: msg,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.msg || "Failed to update availability",
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchInfo();
    setIsLoading(false);
  }, []);

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      {isLoading ? (
        <Loading size={60}/>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.images[0]} alt="" className="productImg" />
                </td>
                <td>{product.name}</td>
                <td>{product.gender}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <img src={product.brand} alt="" className="productImg" />
                </td>
                <td>{product.stock}</td>
                <td>
                  <Switch
                    loading={isLoading}
                    defaultChecked={product.available}
                    onChange={() =>
                      handleAvailability(product._id, product.available)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListProduct;
