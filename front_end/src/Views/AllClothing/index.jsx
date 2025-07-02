import React, { useState, useEffect } from "react";
import Filter from "../../Component/FilterSec/index";
import "./style.css";
import ProductCard from "../../Component/ProductCard/index";
import { filterProduct } from "../../APIs/userAPIs";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loader";
import { Box } from "lucide-react";

export default function AllClothing() {
  const limit = 6;
  const [product, setProduct] = useState([]);
  const params = useParams();
  const gender = params?.gender || "all";
  const category = params?.cate;
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError("");
      const { data, code, msg } = await filterProduct(gender, category, limit);

      if (code === 0) {
        setProduct(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError("Something went wrong while fetching products.");
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, category]);

  console.log(product);

  return (
    <>
      <div className="category-name">
        <p>{category.replace("-", " ")}</p>
      </div>

      <div className="allClothing">
        <Filter />
        <div className="cloths">
          {isLoading ? (
            <Loading size={60} />
          ) : isError ? (
            <p className="error">{isError}</p>
          ) : product.length === 0 ? (
            <p className="empty">
              <Box
                size={48}
                style={{ color: "#d0d0d0", marginBottom: "8px" }}
              />
              No products found
            </p>
          ) : (
            product?.map((e) => <ProductCard id={e.id} key={e.id} {...e} />)
          )}
        </div>
      </div>

      <div className="pagination-btn">
        <a href="#" className="previous round" aria-label="Previous page">
          &#8249;
        </a>
        <a href="#" className="next round" aria-label="Next page">
          &#8250;
        </a>
      </div>
    </>
  );
}
