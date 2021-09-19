import { Button, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BreatCrumb from "../components/Bread_Crumb";
import { DataContext } from "../store/GlobalState";
import { commerce } from "../utils/commerce";
import CartItem from "./CartItem";
import Loading from "./Loading";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const isEmpty = cart.total_items === 0 ? true : false;

  const EmptyCard = () => {
    return (
      <Typography variant="subtitle1">
        Không có sản phẩm trong giỏ hàng,
        <Link to="/">Quay về trang chủ!</Link>
      </Typography>
    );
  };

  if (!cart) {
    return <Loading />;
  }

  //Remove a product from cart
  const handleRemoveFromCart = async (productId) => {
    await commerce.cart.remove(productId).then((data) => {
      dispatch({ type: "ADD_CART", payload: data.cart });
      dispatch({
        type: "NOTIFY",
        payload: { success: "Xóa sản phẩm thành công!" },
      });
    });
  };

  const handleUpdateCart = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });
    dispatch({ type: "ADD_CART", payload: item.cart });
  };

  const FilledCard = () => {
    return (
      <>
        {Object.keys(cart).length === 0 ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-8 text-secondary table-responsive mb-3">
              <table className="table table-bordered table-cart">
                <thead className="thead-dark">
                  <tr style={{ fontSize: "14px" }}>
                    <th>Sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá tiền</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.line_items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleUpdateCart={handleUpdateCart}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Thanh toán</h5>
                  <hr />
                  <div className="card-text d-flex justify-content-between align-items-center my-3">
                    <span>Tạm tinh:</span>
                    <span className="text-danger fs-largest">
                      {cart.subtotal.formatted_with_code}
                    </span>
                  </div>
                  <Button
                    component={Link}
                    to="/thanh-toan"
                    className="btn btn-info w-100 text-center text-capitalize"
                    size="large"
                    type="button"
                    variant="contained"
                    color="primary"
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <BreatCrumb title="Giỏ hàng" />
      <div className="cart-page">
        <h4 className="text-capitalize mb-3" style={{ color: "#000" }}>
          Giỏ hàng
        </h4>
        {isEmpty ? <EmptyCard /> : <FilledCard />}
      </div>
    </>
  );
};

export default Cart;
