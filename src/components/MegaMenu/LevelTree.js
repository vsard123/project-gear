import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../utils/commerce";

const LevelTree = ({ parent_id }) => {
  const [children, setChildren] = useState([]);
  const fetchCategories = async () => {
    await commerce.categories
      .retrieve(parent_id)
      .then((category) => setChildren(category.children));
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="list-none menu-tree">
      {children.map((category) => (
        <li key={category.id}>
          <Link
            to={`/danh-muc/${category.slug}`}
            className="nav-link fs-medium"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LevelTree;
