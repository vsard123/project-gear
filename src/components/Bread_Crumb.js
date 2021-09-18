import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

export default function Bread_Crumbs({ title }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="py-4">
      <Link to="/">Trang chủ</Link>
      <Link to="#" aria-current="page">
        {title}
      </Link>
    </Breadcrumbs>
  );
}
