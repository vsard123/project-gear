import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import DrawerMenu from "./DrawerMenu";

import { DataContext } from "../store/GlobalState";
import { Divider, Drawer, Hidden } from "@material-ui/core";
import Search from "./Search";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0),
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  toolbar: {
    margin: "0 auto",
    padding: "0 0 0 0",
  },

  sectionDesktop: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  wrapper: {
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  },
}));

export default function Navbar(props) {
  const { window } = props;
  const { state } = useContext(DataContext);
  const { cart } = state;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <DrawerMenu />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="default"
        style={{ boxShadow: "none", border: "1px solid #ddd" }}
      >
        <Container maxWidth="lg" className={classes.wrapper}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}
            <Link to="/">
              <img
                className="logo"
                src="https://res.cloudinary.com/mctgear/image/upload/v1632047808/logo_banner/Logo_500x230_NEW_enpjpn.png"
                alt="logo"
              />
            </Link>
            <Search />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/gio-hang">
                <IconButton
                  aria-label="show 17 new notifications pr-0"
                  style={{ color: "#000", borderRadius: "10px" }}
                >
                  <Badge
                    badgeContent={cart.total_items}
                    color="secondary"
                    style={{ alignItems: "center" }}
                  >
                    <span
                      className="pr-2 d-none d-lg-block"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Giỏ hàng
                    </span>
                    <ShoppingCartOutlinedIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
