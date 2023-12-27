import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import { useNavigate } from "react-router-dom";
import { Products } from "../HomePage/HomePage";
import ProductOrderCard from "../../features/ProductOrderCard";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import OrderStatus from "../../features/OrderStatus";
import { OrderStatusEnum } from "../../types/OrderStatus";

// type OrderDetailPageProps = {
//   //
// };

const OrderDetailPage: React.FC<any> = () => {
  const navigate = useNavigate();

  //Redux
  const orderIdReducer = useSelector(
    (state: RootReducers) => state.orderIdReducer
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

  return (
    <Box>
      <PageName name="รายละเอียดคำสั่งซื้อ"></PageName>
      <Stack alignItems={"center"}>
        <Stack
          mr={2}
          direction={"row"}
          gap={1}
          alignItems={"center"}
          width={"100%"}
          maxWidth={571}
        >
          <Box>สถานะ: </Box>
          <Box>
            {orderIdReducer.order?.order_status && (
              <OrderStatus
                name={
                  orderIdReducer.order?.order_status &&
                  orderIdReducer.order?.order_status
                }
              ></OrderStatus>
            )}
          </Box>
        </Stack>
      </Stack>
      <Stack
        maxHeight={400}
        sx={{ overflowY: "scroll" }}
        spacing={2}
        pt={4}
        direction={"column"}
        alignItems={"center"}
      >
        {orderIdReducer.order &&
          orderIdReducer.order.orderDetail.map((item: any) => (
            <ProductOrderCard
              viewMode
              key={item.product.id}
              productName={item.product.name}
              price={item.price}
              quantity={item.quantity}
              image={item.product.image}
            ></ProductOrderCard>
          ))}
      </Stack>
      <Box display={"flex"} justifyContent={"center"}>
        <Stack
          mr={2}
          width={"100%"}
          maxWidth={571}
          direction={"column"}
          pt={1}
          spacing={2}
        >
          <Box fontSize={20} fontWeight={400} textAlign={"right"}>
            ยอดทั้งหมด: {totalPrice()} บาท
          </Box>
          <Button
            onClick={() => {
              navigate(`/payment/${orderIdReducer.order?.id}`);
            }}
            variant="outlined"
          >
            ย้อนกลับ
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDetailPage;
