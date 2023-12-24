import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Menu, MenuItem } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import * as logoutActions from "../../redux/actions/login.action";
import { useAppDispatch } from "../..";

const drawerWidth = 240;

interface Props {
  openDrawer: () => void;
}

export default function Navbar({ openDrawer }: Props) {
  const navigate = useNavigate();

  //Redux
  const dispatch = useAppDispatch();

  //Menu list
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = "Account-menu";
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          // dispatch(logoutActions.logoutAction((path) => navigate(path)) as any);
          navigate("/my-order");
        }}
      >
        My orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          dispatch(logoutActions.logoutAction((path) => navigate(path)) as any);
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        color: "white",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={openDrawer}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          เขียว เขียว
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={() => navigate("/cart")}
          size="large"
          color="inherit"
        >
          <Badge badgeContent={10} color="error">
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
}
