import { Skeleton } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../utils/commerce";
import ProductItem from "./ProductItem";

const ProductHome = ({ category_id }) => {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState({});

  const fetchProductsCategory = async () => {
    await commerce.categories
      .retrieve(category_id)
      .then((category) => setCat(category));

    await commerce.products
      .list({ limit: 4, category_id: category_id })
      .then((product) => setProducts(product.data));
  };

  useEffect(() => {
    fetchProductsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id]);
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
        <div className="products py-3">
          <div className="card">
            <Skeleton variant="rectangular" width="100%" height={286} />
            <Skeleton variant="text" />
          </div>
          <div className="card">
            <Skeleton variant="rectangular" width={286} height={286} />
            <Skeleton variant="text" />
          </div>
          <div className="card">
            <Skeleton variant="rectangular" width={286} height={286} />
            <Skeleton variant="text" />
          </div>
          <div className="card">
            <Skeleton variant="rectangular" width={286} height={286} />
            <Skeleton variant="text" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHome;
