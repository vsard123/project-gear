import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./Bread_Crumb";
import { commerce } from "../utils/commerce";
import ProductItem from "./ProductItem";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    await commerce.products.list().then((product) => setProducts(product.data));
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Container maxWidth="lg" className="my-5">
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
    </Container>
  );
};

export default ProductAll;
