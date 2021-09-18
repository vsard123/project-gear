/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import LevelTree from "./LevelTree";
// import { commerce } from "../../utils/commerce";

const LevelTwo = ({ categories, parent_id }) => {
  return (
    <ul className="submenu dropdown-menu ">
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-3 mb-3">
            <Link to={`/danh-muc/${category.slug}`} className="nav-link">
              <span className="font-bold fs-medium color-red">
                {category.name}
              </span>
            </Link>
            <LevelTree parent_id={category.id} />
          </div>
        ))}
      </div>
    </ul>
  );
};

export default LevelTwo;
