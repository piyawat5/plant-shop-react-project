/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Grid, Skeleton, Stack } from "@mui/material";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import ProductTypeDropdown from "../../features/ProductTypeDropdown";
import SearchInput from "../../features/SearchInput";
import SearchProductPrice from "../../features/SearchProductPrice";
import PageName from "../../features/PageName";
import usePagination from "../../features/Pagination";
import { Products } from "../HomePage/HomePage";
import ProductCard from "../../features/ProductCard";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import NumberEditor from "../../features/NumberEditor";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import { useLocation } from "react-router-dom";
import * as productActions from "../../../redux/actions/product.action";
import * as productIdActions from "../../../redux/actions/productId.action";
import * as clearActions from "../../../redux/actions/clearSearch.action";
import * as orderActions from "../../../redux/actions/order.action";
import * as cartActions from "../../../redux/actions/cart.action";
import orderReducer from "../../../redux/reducers/order.reducer";

// type ShopPageProps = {
//   //
// };

const ShopPage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("category");

  const productReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );
  const orderReducer = useSelector((state: RootReducers) => state.orderReducer);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const [searchProductName, setSearchProductName] = useState("");
  const [searchProductType, setSearchProductType] = useState("");
  const [searchProductPrice, setSearchProductPrice] = useState({});
  const [quantity, setQuantity] = useState(1);
  const isInitialRender = React.useRef(true);

  //Pagination
  let [page, setPage] = React.useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(productReducer.products.length / PER_PAGE);
  const _DATA = usePagination(productReducer.products, PER_PAGE);
  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  //scroll after next page
  const ref = React.useRef<null | HTMLDivElement>(null);

  //modal
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    const combineSearch = {
      searchProductName,
      searchProductPrice,
      searchProductType,
    };

    if (queryParam) {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      dispatch(productActions.ProductAction(combineSearch) as any);
    } else {
      dispatch(productActions.ProductAction(combineSearch) as any);
    }
  }, [searchProductName, searchProductType, searchProductPrice]);

  return (
    <Box>
      {/* click paging then scroll top page */}
      <div ref={ref}></div>
      <PageName name="หน้าร้าน"></PageName>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box fontSize={20} mb={1}>
          Filter
        </Box>
        <Button
          onClick={() => dispatch(clearActions.handleClearSearch() as any)}
        >
          CLEAR
        </Button>
      </Stack>

      <Grid container gap={3} marginBottom={4}>
        <Grid item xs={12} sm={12} lg={12}>
          <SearchInput handleValue={setSearchProductName}></SearchInput>
        </Grid>
        <Grid item xs={12} sm={5.5} lg={5.5}>
          <ProductTypeDropdown
            handleValue={setSearchProductType}
            searchQuery={queryParam}
          ></ProductTypeDropdown>
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <SearchProductPrice
            handleValue={setSearchProductPrice}
          ></SearchProductPrice>
        </Grid>
      </Grid>
      {orderReducer.isFetching || productReducer.isFetching ? (
        <>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </>
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          gap={2}
          flexWrap={"wrap"}
        >
          {_DATA.currentData()?.map((product, index) => (
            <ProductCard
              key={product.id}
              handleClick={() => {
                dispatch(productIdActions.productIdAction(product.id) as any);
                setOpenModal(true);
              }}
              price={product.price}
              productName={product.name}
              stock={product.stock}
              image={product?.image}
            ></ProductCard>
          ))}
        </Stack>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
        <Pagination
          onClick={() => {
            ref.current?.scrollIntoView({ behavior: "smooth" }) as any;
          }}
          count={count}
          size="large"
          //* protect filtering product
          page={page > count ? 1 : page}
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
      <Modal
        textConfirm="เพิ่มไปยังตระกร้า"
        role={ModalRoleEnum.confirm}
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onSubmit={async () => {
          const scrollPosition = window.scrollY;
          const body = {
            quantity,
            price: productIdReducer.product.price,
            customer_id: loginReducer.authorization.customer?.id,
            product_id: productIdReducer.product.id,
          };

          const combineSearch = {
            searchProductName,
            searchProductPrice,
            searchProductType,
          };

          await dispatch(orderActions.postOrders(body) as any);
          await dispatch(productActions.ProductAction(combineSearch) as any);
          dispatch(
            cartActions.getCart(loginReducer.authorization.customer.id) as any
          );
          window.scrollTo(0, scrollPosition);
        }}
      >
        <Stack direction={"column"} alignItems={"center"}>
          <Box fontSize={20} fontWeight={400}>
            {productIdReducer.product?.name}
          </Box>
          <img height={200} src={productIdReducer.product?.image}></img>
          <Stack direction={"column"} spacing={2} width={300}>
            <Box>
              <span style={{ fontWeight: 400 }}>รายละเอียด: </span>
              <span style={{ fontWeight: 300, color: "grey" }}>
                {productIdReducer.product?.description}
              </span>
            </Box>
            <Box>
              <span style={{ fontWeight: 400 }}>สต็อก: </span>

              <span style={{ fontWeight: 300, color: "grey" }}>
                {productIdReducer.product?.stock}
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <span style={{ fontWeight: 400 }}> ราคา: </span>

                <span style={{ fontWeight: 300, color: "grey" }}>
                  {productIdReducer.product?.price}
                </span>
              </Box>
              <Box
                gap={2}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Box>จำนวน: </Box>
                <NumberEditor
                  handleValue={(value) => {
                    setQuantity(value);
                  }}
                ></NumberEditor>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Modal>
    </Box>
  );
};

export default ShopPage;
