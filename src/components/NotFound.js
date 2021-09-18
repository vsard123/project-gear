import React from "react";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm" className="my-3 text-center">
      <img src="/images/404_image.png" alt="404" style={{ maxWidth: "100%" }} />
      <p>Trang này không tồn tại</p>
      <Link to="/" className="btn btn-danger">
        Quay về trang chủ
      </Link>
    </Container>
  );
};

export default NotFound;
