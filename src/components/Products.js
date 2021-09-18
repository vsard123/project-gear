import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { commerce } from "../utils/commerce";
import ProductItem from "./ProductItem";
import BreadCrumbs from "./Bread_Crumb";
import { Container, Typography } from "@material-ui/core";
import Loading from "./Loading";

const Products = () => {
  const slug = useRouteMatch().params.slug;

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const fetchProducts = async () => {
    await commerce.products
      .list({ category_slug: slug })
      .then((product) => setProducts(product.data));
    await commerce.categories
      .retrieve(slug, { type: "slug" })
      .then((category) => setCategory(category));
  };
  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <>
      {Object.keys(category).length > 0 ? (
        <Container maxWidth="lg" className="my-5">
          <Typography variant="h4" color="initial">
            {category.name}
          </Typography>
          <BreadCrumbs title={category.name} />
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Products;
