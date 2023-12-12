import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import ShopPage from "./components/pages/ShopPage";
import ProfilePage from "./components/pages/ProfilePage";
import PaymentPage from "./components/pages/PaymentPage";
import OrderDetailPage from "./components/pages/OrderDetailPage";
import MyOrderPage from "./components/pages/MyOrderPage";
import CartPage from "./components/pages/CartPage";
import AdminAddStockPage from "./components/pages/AdminAddStockPage";
import AdminEditStockPage from "./components/pages/AdminEditStockPage";
import AdminStockPage from "./components/pages/AdminStockPage";
import AdminTransactionPage from "./components/pages/AdminTransactionPage";
import Navbar from "./components/layouts/Navbar";
import Menu from "./components/layouts/Menu";

const drawerWidth = 240;

export default function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        openDrawer={() => {
          setOpen(!open);
        }}
      ></Navbar>
      <Menu
        open={open}
        closeDrawer={() => {
          setOpen(!open);
        }}
      ></Menu>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
          <Route
            path="/order-detail"
            element={<OrderDetailPage></OrderDetailPage>}
          ></Route>
          <Route path="/my-order" element={<MyOrderPage></MyOrderPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route
            path="/admin-add-stock"
            element={<AdminAddStockPage></AdminAddStockPage>}
          ></Route>
          <Route
            path="/admin-edit-stock"
            element={<AdminEditStockPage></AdminEditStockPage>}
          ></Route>
          <Route
            path="/admin-stock"
            element={<AdminStockPage></AdminStockPage>}
          ></Route>
          <Route
            path="/admin-transaction"
            element={<AdminTransactionPage></AdminTransactionPage>}
          ></Route>
        </Routes>
      </Box>
    </Box>
  );
}
