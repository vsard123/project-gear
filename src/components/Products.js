import React, { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { commerce } from "../utils/commerce";
import ProductItem from "./ProductItem";
import BreadCrumbs from "./Bread_Crumb";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";
import { Pagination } from "@material-ui/lab";

const Products = () => {
  const slug = useRouteMatch().params.slug;

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    await commerce.products
      .list({ category_slug: slug, limit: 8, page: page })
      .then((product) => {
        setProducts(product.data);
        setState(product);
      });
    await commerce.categories
      .retrieve(slug, { type: "slug" })
      .then((category) => setCategory(category));
  }, [slug, page]);

  const handleChange = (event, value) => {
    setPage(value);
    setLoading(true);
    timeout();
  };

  const timeout = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  useEffect(() => {
    fetchProducts();
  }, [slug, fetchProducts, page]);
  return (
    <>
      {Object.keys(category).length > 0 ? (
        <div className="my-5 category-page">
          <Typography variant="h4" color="initial">
            {category.name}
          </Typography>
          <BreadCrumbs title={category.name} />
          <div className="products">
            {products ? (
              products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <h2>No Products</h2>
            )}
          </div>
          {state.meta.pagination.total_pages > 1 && (
            <div className="d-flex justify-content-center my-3">
              <Pagination
                count={state.meta.pagination.total_pages}
                page={page}
                color="primary"
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      {loading && <Loading />}
    </>
  );
};

export default Products;
