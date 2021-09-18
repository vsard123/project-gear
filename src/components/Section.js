import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import Products from "./Products";
import ProductAll from "./ProductAll";
import Details from "./Details";
import Container from "@material-ui/core/Container";
import NotFound from "./NotFound";
import Cart from "./Cart";
import Checkout from "./CheckoutForm/Checkout/Checkout";

const Section = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/san-pham" component={ProductAll} exact />
          <Route path="/danh-muc/:slug" component={Products} exact />
          <Route path="/san-pham/:id" component={Details} exact />
          <Route path="/gio-hang" component={Cart} exact />
          <Route path="/gio-hang" component={Cart} exact />
          <Route path="/thanh-toan" component={Checkout} exact />

          <Route component={NotFound} />
        </Switch>
      </Container>
    </section>
  );
};

export default Section;
