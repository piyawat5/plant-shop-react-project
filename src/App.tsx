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
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import EditProfilePage from "./components/pages/EditProfilePage";
import { useSelector } from "react-redux";
import { RootReducers } from "./redux/reducers";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useEffect } from "react";
import * as loginActions from "./redux/actions/login.action";
import { useAppDispatch } from ".";
import PublicRoutes from "./utils/PublicRoutes";

const drawerWidth = 240;

export default function App() {
  const [open, setOpen] = React.useState(false);
  const xs = useMediaQuery("(max-width:600px)");

  //redux
  const dispatch = useAppDispatch();
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  const theme = createTheme({
    components: {
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: "red",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage:
              "url(" +
              `${process.env.PUBLIC_URL}/images/drawer-background.png` +
              ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#9cff7a",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#9cff7a",
            },
            "&:hover": {
              backgroundColor: "#e2ffd8",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "Mitr",
      fontWeightLight: 200,
      fontWeightRegular: 300,
      fontWeightMedium: 400,
      fontWeightBold: 500,
    },
    palette: {
      primary: {
        main: "#54B435",
        "100": "#E2FFD8",
        "200": "#9CFF7A",
        "300": "#54B435",
        "400": "#007105",
        "500": "#103F00",
      },
      secondary: {
        main: "#F0FF42",
        "100": "#F9FFB2",
        "200": "#F5FF7E",
        "300": "#F0FF42",
        "400": "#FFC600",
        "500": "#FF8A00",
      },
      background: {
        default: "#EFEFEF",
      },
      error: {
        main: "#DC2F02",
      },
      success: {
        main: "#47FC22",
      },
      grey: {
        "100": "#F8F7F7",
        "200": "#EFEFEF",
        "300": "#D7D7D7",
        "400": "#B3B3B3",
        "500": "#838383",
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      await dispatch(loginActions.authen() as any);
    };
    getData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loginReducer.authorization && (
          <>
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
          </>
        )}

        <Box
          component="main"
          sx={{
            overflowX: "hidden",
            flexGrow: 1,
            py: 3,
            paddingX: xs ? "12px" : "74px",
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Routes>
            <Route element={<PublicRoutes></PublicRoutes>}>
              <Route
                path="/register"
                element={<RegisterPage></RegisterPage>}
              ></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            </Route>

            <Route element={<PrivateRoutes></PrivateRoutes>}>
              <Route
                path="/"
                element={<Navigate to="/home"></Navigate>}
              ></Route>
              <Route
                path="*"
                element={<Navigate to="/home"></Navigate>}
              ></Route>
              <Route path="/home" element={<HomePage></HomePage>}></Route>
              <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
              <Route
                path="/profile"
                element={<ProfilePage></ProfilePage>}
              ></Route>
              <Route
                path="/edit-profile"
                element={<EditProfilePage></EditProfilePage>}
              ></Route>
              <Route
                path="/payment/:id"
                element={<PaymentPage></PaymentPage>}
              ></Route>
              <Route
                path="/order-detail"
                element={<OrderDetailPage></OrderDetailPage>}
              ></Route>
              <Route
                path="/my-order"
                element={<MyOrderPage></MyOrderPage>}
              ></Route>
              <Route path="/cart" element={<CartPage></CartPage>}></Route>
              <Route
                path="/admin-add-stock"
                element={<AdminAddStockPage></AdminAddStockPage>}
              ></Route>
              <Route
                path="/admin-edit-stock/:id"
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
            </Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
