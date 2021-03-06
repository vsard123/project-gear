import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Thông tin đơn hàng
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem key={product.id} style={{ padding: "10px 0" }}>
            <ListItemText
              primary={product.name}
              secondary={`Số lượng: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Tổng cộng" />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: "700", color: "red" }}
          >
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
