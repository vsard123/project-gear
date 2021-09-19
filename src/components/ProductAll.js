import { Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import BreadCrumbs from "./Bread_Crumb";
import { commerce } from "../utils/commerce";
import ProductItem from "./ProductItem";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
}));

const ProductAll = () => {
  const classes = useStyles();
  const [products, setProducts] = useState({});
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    await commerce.products.list({ limit: 8, page: page }).then((product) => {
      setState(product);
      setProducts(product.data);
    });
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);
  return (
    <>
      {Object.keys(products).length > 0 ? (
        <div className="my-5 category-page">
          <Typography variant="h4" color="initial">
            Sản phẩm
          </Typography>
          <BreadCrumbs title="Sản phẩm" />
          <div className="products">
            {products.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            )}
          </div>
          <div className={classes.center}>
            <Pagination
              count={state.meta.pagination.total_pages}
              page={page}
              color="primary"
              onChange={handleChange}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductAll;
