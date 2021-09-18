/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../store/GlobalState";

const DrawerMenu = () => {
  const { state } = useContext(DataContext);
  const { categories } = state;

  return (
    <nav className="sidebar py-2 mb-4">
      <ul className="nav flex-column" id="accordionExample">
        {categories.map((category) =>
          category.children.length === 0 ? (
            <li className="nav-item" key={category.id}>
              <Link
                to={`/danh-muc/${category.slug}`}
                className="nav-link d-flex justify-content-start"
              >
                {category.icon && (
                  <img
                    style={{ width: "20px", marginRight: "10px" }}
                    src={category.icon.url}
                    alt={category.name}
                  />
                )}
                {category.name}
              </Link>
            </li>
          ) : (
            <li className="nav-item" key={category.id}>
              <a
                className="nav-link collapsed d-flex justify-content-start"
                data-toggle="collapse"
                data-target={`#collapse${category.id}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {category.icon && (
                  <img
                    style={{ width: "20px", marginRight: "10px" }}
                    src={category.assets[0].url}
                    alt={category.name}
                  />
                )}
                {category.name}
                <i
                  className="fas fa-caret-down right-content fs-large"
                  aria-hidden="true"
                ></i>
              </a>
              <ul
                id={`collapse${category.id}`}
                className="collapse list-none"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                {category.children.map((item) => (
                  <li key={item.id}>
                    <Link to={`/danh-muc/${item.slug}`} className="nav-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
        {/* <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Menu1
          </a>

          <ul
            id="collapseOne"
            className="collapse list-none"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <li>
              <a className="nav-link" to="#">
                Submenu item 1
              </a>
            </li>
            <li>
              <a className="nav-link" to="#">
                Submenu item 2
              </a>
            </li>
            <li>
              <a className="nav-link" to="#">
                Submenu item 3
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" to="#">
            Menu 2
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default DrawerMenu;
