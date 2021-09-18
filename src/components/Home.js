import React from "react";
import Banner from "./Banner";
import ProductHome from "./ProductHome";

const Home = () => {
  return (
    <>
      <Banner />
      <section className="product-home">
        <ProductHome category_id="cat_r2LM5QdqvoZV1g" />
        <ProductHome category_id="cat_NXELwjZA7w3A4p" />
      </section>
    </>
  );
};

export default Home;
