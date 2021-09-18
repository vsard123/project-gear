import React from "react";
import { Link } from "react-router-dom";
// import { decrease, increase } from "../store/Actions";

const CartItem = ({ item, handleRemoveFromCart, handleUpdateCart }) => {
  return (
    <tr>
      <td style={{ width: "100px", overflow: "hidden" }}>
        <img
          src={item.media.source}
          alt={item.name}
          className="w-100"
          style={{ minWidth: "80px", height: "80px" }}
        />
      </td>

      <td style={{ minWidth: "200px" }} className="w-50 align-middle">
        <h5 className="text-capitalize text-secondary title-product-cart fs-medium">
          <Link to={`/san-pham/${item.id}`}>{item.name}</Link>
        </h5>
        <h6 className="text-danger">{item.price.formatted_with_code}</h6>
      </td>

      <td className="align-middle" style={{ minWidth: "150px" }}>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
          disabled={item.quantity === 1 ? true : false}
        >
          -
        </button>

        <span className="px-3">{item.quantity}</span>

        <button
          className="btn btn-outline-secondary"
          onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
          //   disabled={item.quantity === item.inStock ? true : false}
        >
          +
        </button>
      </td>
      <td
        className="align-middle fs-large"
        style={{ minWidth: "100px", color: "red", fontWeight: "bold" }}
      >
        {item.line_total.formatted_with_code}
      </td>
      <td
        className="align-middle"
        style={{ minWidth: "50px", cursor: "pointer" }}
      >
        <i
          className="far fa-trash-alt text-danger"
          aria-hidden="true"
          style={{ fontSize: "18px" }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => handleRemoveFromCart(item.id)}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
