import { createContext, useEffect, useReducer } from "react";
import { commerce } from "../utils/commerce";
import reducers from "./Reducers";
// import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    cart: {},
    modal: [],
    order: {},
    categories: [],
    openMenu: false,
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  // const { cart } = state;

  const fetchCart = async () => {
    await commerce.cart.retrieve().then((response) => {
      dispatch({
        type: "ADD_CART",
        payload: response,
      });
    });
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    dispatch({ type: "ADD_CATEGORIES", payload: data });
  };

  // Kiểm tra nếu có firstLogin trong localStorage thì sẽ getData từ Cookie ->
  useEffect(() => {
    fetchCart();
    fetchCategories();
    // getData("categories").then((res) => {
    //   if (res.err)
    //     return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    //   dispatch({
    //     type: "ADD_CATEGORIES",
    //     payload: res.categories,
    //   });
    // });
  }, []);

  // //Lấy giỏ hàng từ local storage
  // useEffect(() => {
  //   const __next__cart01 = JSON.parse(localStorage.getItem("__next__cart01"));

  //   if (__next__cart01) dispatch({ type: "ADD_CART", payload: __next__cart01 });
  // }, []);

  // //lấy dữ liệu từ store gán vào localStorage, cập nhật lại khi store cart thay đổi
  // useEffect(() => {
  //   localStorage.setItem("__next__cart01", JSON.stringify(cart));
  // }, [cart]);

  // //Lấy đơn hàng của user từ api/order
  // useEffect(() => {
  //   if (auth.token) {
  //     getData("order", auth.token).then((res) => {
  //       if (res.err)
  //         return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  //       dispatch({ type: "ADD_ORDERS", payload: res.orders });
  //     });
  //     if (auth.user.role === "admin") {
  //       getData("user", auth.token).then((res) => {
  //         if (res.err)
  //           return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  //         dispatch({ type: "ADD_USERS", payload: res.users });
  //       });
  //     }
  //   } else {
  //     dispatch({ type: "ADD_ORDERS", payload: [] });
  //     dispatch({ type: "ADD_USERS", payload: [] });
  //   }
  // }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
