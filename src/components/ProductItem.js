import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Link } from "react-router-dom";
import { DataContext } from "../store/GlobalState";
import { commerce } from "../utils/commerce";
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

const ProductItem = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(DataContext);

  const handleAddCart = async (product_id, quantity) => {
    dispatch({
      type: "NOTIFY",
      payload: { success: "Thêm vào giỏ hàng thành công" },
    });
    await commerce.cart.add(product_id, quantity).then((item) => {
      dispatch({
        type: "ADD_CART",
        payload: item.cart,
      });
    });
  };

  return (
    <div className="card align-content-center">
      {product.assets.length > 1 ? (
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="front">
              <Link to={`/san-pham/${product.id}`}>
                <img src={product.assets[0].url} alt="" />
              </Link>
            </div>

            <div className="back">
              <Link to={`/san-pham/${product.id}`}>
                <img src={product.assets[1].url} alt="" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/san-pham/${product.id}`}>
          <img
            src={product.assets[0].url}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
      )}

      <div className="card-body">
        <Link to={`/san-pham/${product.id}`}>
          <h6
            className="card-title product-name text-capitalize"
            title={product.name}
          >
            {product.name}
          </h6>
        </Link>
        {/* <p className="card-text" title={product.description}>
            {product.description}
          </p> */}
        <div className="row justify-content-between align-items-center mx-0 mb-2">
          <div className="price">
            <span className="d-block text-danger fs-largest">
              {product.price.formatted_with_code}
            </span>
          </div>
          {/* <div className="status">
              {product.inStock > 0 ? (
                <Chip label="Còn hàng" />
              ) : (
                <Chip label="Hết hàng" />
              )}
            </div> */}
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

export default ProductItem;
