import { Box, Skeleton, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import MyOrderCard from "../../features/MyOrderCard";
import { useEffect } from "react";
import { useAppDispatch } from "../../..";
import * as orderActions from "../../../redux/actions/order.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

// type MyOrderPageProps = {
//   //
// };

const MyOrderPage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const orderReducer = useSelector((state: RootReducers) => state.orderReducer);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  useEffect(() => {
    dispatch(
      orderActions.getMyOrders(loginReducer.authorization.customer.id) as any
    );
  }, []);

  return (
    <Box>
      <PageName name="รายการสั่งซื้อทั้งหมดของฉัน"></PageName>
      <Stack gap={3} alignItems={"center"}>
        {orderReducer.isFetching ? (
          <>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </>
        ) : (
          orderReducer.orders?.map((item: any) => (
            <MyOrderCard
              key={item.id}
              orderId={item.id}
              status={item.order_status}
            ></MyOrderCard>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default MyOrderPage;
