import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { SvgIconProps } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  open: boolean;
  closeDrawer: () => void;
}

interface Menus {
  name: string;
  path: string;
  icon: React.ReactElement<SvgIconProps>;
}

export default function Menu({ open, closeDrawer }: Props) {
  const location = useLocation();
  const path = location.pathname;

  const menus: Menus[] = [
    { name: "Home", path: "/home", icon: <AccountCircle></AccountCircle> },
    { name: "Shop", path: "/shop", icon: <AccountCircle></AccountCircle> },
    {
      name: "Transaction",
      path: "/admin-transaction",
      icon: <AccountCircle></AccountCircle>,
    },
    {
      name: "Stock",
      path: "/admin-stock",
      icon: <AccountCircle></AccountCircle>,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menus.map((menu, index) => {
          return (
            index < 2 && (
              <ListItemButton
                sx={{ my: 1, pl: 5 }}
                key={menu.name}
                selected={menu.path === path}
                to={menu.path}
                component={Link}
                onClick={closeDrawer}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            )
          );
        })}
      </List>
      <Divider />
      <List>
        {menus.map((menu, index) => {
          return (
            index >= 2 && (
              <ListItemButton
                sx={{ my: 1, pl: 5 }}
                key={menu.name}
                selected={menu.path === path}
                to={menu.path}
                component={Link}
                onClick={closeDrawer}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            )
          );
        })}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
