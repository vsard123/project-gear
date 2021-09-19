import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#fff",
    background: "mediumseagreen",
    "&:hover": {
      color: "#fff",
      background: "darkgreen",
    },
  },
}));

const ProductRelated = ({ product, handleAddCart }) => {
  const classes = useStyles();
  return (
    <div className="card align-content-center">
      <Link to={`/san-pham/${product.id}`}>
        <img
          src={product.media.source}
          className="card-img-top"
          alt={product.name}
        />
      </Link>

      <div className="card-body">
        <Link to={`/san-pham/${product.id}`}>
          <h6
            className="card-title product-name text-capitalize mb-0"
            title={product.name}
          >
            {product.name}
          </h6>
        </Link>

        <div className="row justify-content-between align-items-center mx-0 my-2">
          <div className="price">
            <span className="d-block text-danger fs-largest">
              {product.price.formatted_with_code}
            </span>
          </div>
        </div>
        <div className="row justify-content-center mx-0">
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className={classes.button}
            onClick={() => handleAddCart(product.id, 1)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductRelated;
