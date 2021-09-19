import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../utils/commerce";
import { isPersistedState } from "../utils/fetchData";
import ProductItem from "./ProductItem";
import SkeletonItem from "./Skeleton/SkeletonItem";

const ProductHome = ({ category_id }) => {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState({});

  const fetchProductsCategory = useCallback(async () => {
    await commerce.categories
      .retrieve(category_id)
      .then((category) => setCat(category));

    await commerce.products
      .list({ limit: 4, category_id: category_id })
      .then((product) => setProducts(product.data));
  }, [category_id]);

  useEffect(() => {
    const sessionState = isPersistedState(category_id);
    if (sessionState) {
      console.log("Grabbing from session state");
      setProducts(sessionState);
      return;
    }
    console.log("Grabbing from API");
    setProducts([]);
    fetchProductsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id, fetchProductsCategory]);

  //write to sessionStore
  useEffect(() => {
    sessionStorage.setItem(category_id, JSON.stringify(products));
  }, [category_id, products]);
  return (
    <div className="product-category">
      {cat && (
        <div className="title-category d-flex justify-content-between align-items-center">
          <div className="title fs-largest">{cat.name}</div>
          <div className="view_all">
            <Link to={`danh-muc/${cat.slug}`}>
              Xem tất cả
              <i
                className="fas fa-chevron-circle-right pl-2"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
      )}
      {Object.keys(products).length > 0 ? (
        <div className="products py-3">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <SkeletonItem />
      )}
    </div>
  );
};

export default ProductHome;
