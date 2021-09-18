import React from "react";
import Review from "./Review";
import { Button, Divider, Typography } from "@material-ui/core";

const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
  timeout,
}) => {
  const getLineItems = (checkoutToken) => {
    const line_items = [];
    for (let i = 0; i < checkoutToken.live.line_items.length; i++) {
      const item = {
        name: {
          quantity: checkoutToken.live.line_items[i].quantity,
          variant: checkoutToken.live.line_items[i].variant,
        },
      };
      const string = checkoutToken.live.line_items[i].id;
      item[string] = item["name"];
      delete item["name"];
      line_items.push(item);
    }
    return line_items[0];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      line_items: getLineItems(checkoutToken),
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Primary",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242 4242 4242 4242",
          expiry_month: "01",
          expiry_year: "2023",
          cvc: "123",
          postal_zip_code: "94103",
        },
      },
    };
    onCaptureCheckout(checkoutToken.id, orderData);
    timeout();
    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
