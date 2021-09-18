import React from "react";
import { Link } from "react-router-dom";
import LevelTwo from "./LevelTwo";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const LevelOne = ({ categories }) => {
  return (
    <ul className="nav flex-column list-none">
      {categories.map((category) => (
        <li className="nav-item rounded transition" key={category.id}>
          <Link
            to={`/danh-muc/${category.slug}`}
            className="nav-link d-flex justify-content-start"
          >
            {category.assets.length > 0 && (
              <img
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
                src={category.assets[0].url}
                alt={category.name}
              />
            )}
            {category.name}
            {category.children.length > 0 && (
              <ChevronRightIcon className="have-sub" />
            )}
          </Link>
          {category.children.length > 0 && (
            <LevelTwo categories={category.children} parent_id={category.id} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default LevelOne;
