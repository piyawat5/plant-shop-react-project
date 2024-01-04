import { Box, Button, Stack, Tab, Tabs, useTheme } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useMatch, useNavigate } from "react-router-dom";
import UploadImage from "../../../utils/UploadImage";
import { useAppDispatch } from "../../..";
import * as orderActions from "../../../redux/actions/order.action";
import * as orderIdActions from "../../../redux/actions/orderId.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import { OrderStatusEnum } from "../../types/OrderStatus";

// type PaymentPageProps = {
//   //
// };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PaymentPage: React.FC<any> = () => {
  const match = useMatch("/payment/:id");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState("");

  //Redux
  const dispatch = useAppDispatch();
  const orderIdReducer = useSelector(
    (state: RootReducers) => state.orderIdReducer
  );
  const uploadReducer = useSelector(
    (state: RootReducers) => state.uploadReducer
  );
  function totalPrice() {
    const result = orderIdReducer.order?.orderDetail.reduce(
      (a: number, b: any) => {
        return a + b.price;
      },
      0
    );
    return result;
  }

  //Tab value
  const [value, setValue] = React.useState(0);

  //MUI Theme
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    match?.params.id &&
      dispatch(orderIdActions.getOrderById(+match?.params.id) as any);
  }, []);
  return (
    <Box>
      <PageName name="การชำระเงิน"></PageName>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ mx: 3, px: 3 }} label="เลขบัญชี" {...a11yProps(0)} />
          <Tab
            sx={{ mx: 3, px: 3 }}
            label="สแกนคิวอาร์โค้ด"
            {...a11yProps(1)}
          />
          <Tab sx={{ mx: 3, px: 3 }} label="Promptpay" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack textAlign={"center"} spacing={1}>
              <Box>ธนาคาร xxxxxxxxxxxxx</Box>
              <Box>เลขบัญชี xxxxxxxxxxxxx</Box>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box fontWeight={400} my={2}>
                ยอดทั้งหมด: {totalPrice()} บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              {imageUrl && <img height={450} alt="tree" src={imageUrl}></img>}
              <UploadImage
                handleUrl={(url) => {
                  setImageUrl(url);
                }}
              ></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={async () => {
                  const body = {
                    id: orderIdReducer.order?.id,
                    order_status: OrderStatusEnum.VERIFY,
                    image: imageUrl,
                  };
                  if (imageUrl) {
                    await dispatch(
                      orderActions.editOrder(body, () =>
                        navigate("/my-order")
                      ) as any
                    );
                  }
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={() => {
                  dispatch(
                    orderActions.deleteOrder(orderIdReducer.order?.id) as any
                  );
                  navigate("/cart");
                }}
                variant="outlined"
              >
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack spacing={1} textAlign={"center"}>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box textAlign={"center"}>
                <img
                  alt="QR-code mobile banking"
                  height={200}
                  width={168}
                  src={`${process.env.PUBLIC_URL}/images/My_Facebook_Code.png`}
                ></img>
              </Box>
              <Box fontWeight={400} my={2}>
                จำนวนเงินทั้งหมด: 1500 บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              {imageUrl && <img height={450} alt="tree" src={imageUrl}></img>}
              <UploadImage
                handleUrl={(url) => {
                  setImageUrl(url);
                }}
              ></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={async () => {
                  const body = {
                    id: orderIdReducer.order?.id,
                    order_status: OrderStatusEnum.VERIFY,
                    image: imageUrl,
                  };
                  if (imageUrl) {
                    await dispatch(
                      orderActions.editOrder(body, () =>
                        navigate("/my-order")
                      ) as any
                    );
                  }
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={() => {
                  navigate("/cart");
                }}
                variant="outlined"
              >
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Stack
            spacing={5}
            p={"24px"}
            width={"100%"}
            maxWidth={342}
            bgcolor={"white"}
            boxShadow={2}
            borderRadius={"4"}
          >
            <Box
              onClick={() => {
                navigate("/order-detail");
              }}
              sx={{ cursor: "pointer" }}
              color={theme.palette.primary.main}
              borderBottom={`1px solid ${theme.palette.primary.main}`}
            >
              ตรวจสอบรายละเอียดสินค้าก่อนโอนเงิน *
            </Box>
            <Stack spacing={1} textAlign={"center"}>
              <Box>เบอร์ xxx-xxx-xxxx</Box>
              <Box>นาย ปิยะวัตร พินทุสรศรี</Box>
              <Box fontWeight={400} my={2}>
                จำนวนเงินทั้งหมด: 1500 บาท
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Box>กรุณาอัพโหลด สลิปการโอนเงิน *</Box>
              {imageUrl && <img height={450} alt="tree" src={imageUrl}></img>}
              <UploadImage
                handleUrl={(url) => {
                  setImageUrl(url);
                }}
              ></UploadImage>
            </Stack>
            <Stack spacing={1}>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={async () => {
                  const body = {
                    id: orderIdReducer.order?.id,
                    order_status: OrderStatusEnum.VERIFY,
                    image: imageUrl,
                  };
                  if (imageUrl) {
                    await dispatch(
                      orderActions.editOrder(body, () =>
                        navigate("/my-order")
                      ) as any
                    );
                  }
                }}
                sx={{ color: "white" }}
                variant="contained"
              >
                ยืนยันการโอนเงิน
              </Button>
              <Button
                disabled={
                  orderIdReducer.order?.order_status !==
                    OrderStatusEnum.NOTPAID || uploadReducer.isFetching
                }
                onClick={() => {
                  dispatch(
                    orderActions.deleteOrder(orderIdReducer.order?.id) as any
                  );
                  navigate("/cart");
                }}
                variant="outlined"
              >
                ยกเลิกรายการ
              </Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default PaymentPage;
