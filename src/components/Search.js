import React, { useRef, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { commerce } from "../utils/commerce";
import { Link } from "react-router-dom";

//Styles
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    // borderRadius: "10px",
    boxShadow:
      " rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "000",
  },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //     [theme.breakpoints.down("md")]: {
  //       marginRight: 0,
  //     },
  //   },
  inputRoot: {},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const [dataSearch, setDataSearch] = useState([]);
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      if (e.target.value !== "")
        await commerce.products
          .list({ limit: 6, query: e.target.value.toString() })
          .then((res) => setDataSearch(res.data));
    }, 300);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChangeSearch}
      />
      {dataSearch && search !== "" && (
        <ul className="list-none search-result box-shadow">
          {dataSearch.length === 0 && search !== "" ? (
            <h6 className="p-3">Không tìm thấy sản phẩm</h6>
          ) : (
            dataSearch.map((item) => (
              <li className="result-item" key={item._id}>
                <Link
                  to={`/san-pham/${item.id}`}
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => setSearch("")}
                >
                  <img
                    src={item.assets[0].url}
                    alt={item.name}
                    className="px-2"
                  />
                  <span className="px-2 title-product-result text-capitalize">
                    {item.name}
                  </span>
                  <span className="price color-red fs-large px-2">
                    {item.price.formatted_with_code}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
