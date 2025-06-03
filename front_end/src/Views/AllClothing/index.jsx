import React, { useState, useEffect } from "react";
import Filter from "../../Component/FilterSec/index";
import "./style.css";
import ProductCard from "../../Component/ProductCard/index";
import { filterProduct } from "../../APIs/userAPIs";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loader";

export default function AllClothing() {
  const limit = 6;
  const category = "Mens";
  const [product, setProduct] = useState([]);
  const params = useParams();
  const cate = params.cate;
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const { data, code, msg } = await filterProduct(category, limit);
      console.log(data, code, msg);
      if (code === 200) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, category]);

  console.log(product);

  return (
    <>
      <div className="category-name">
        <p>{cate.replace("-", " ")}</p>
      </div>
      <div className="allClothing">
        <Filter />
        <div className="cloths">
          {!isLoading ? (
            <Loading size={60} />
          ) : (
            product?.map((e) => (
              <ProductCard
                id={e._id}
                key={e._id}
                mainImg={e.mainImg}
                mainTitle={e.mainTitle}
                addPrice={e.addPrice}
              />
            ))
          )}
        </div>
      </div>
      <div className="btn">
        <a href="#" class="previous round">
          &#8249;
        </a>
        <a href="#" class="next round">
          &#8250;
        </a>
      </div>
    </>
  );
}
