/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./MyOrderCard.css";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";
import { OrderStatusEnum } from "../../types/OrderStatus";
import OrderStatus from "../OrderStatus";
import * as orderIdActions from "../../../redux/actions/orderId.action";
import * as orderActions from "../../../redux/actions/order.action";
import Modal from "../Modal";
import { ModalRoleEnum } from "../Modal/Modal";

type MyOrderCardProps = {
  orderId: number;
  status: OrderStatusEnum;
};

const MyOrderCard: React.FC<MyOrderCardProps> = ({ orderId, status }) => {
  const dispatch = useAppDispatch();
  const orderIdReducer = useSelector(
    (state: RootReducers) => state.orderIdReducer
  );
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const navigate = useNavigate();

  //modal
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Stack
      width={"100%"}
      maxWidth={700}
      boxShadow={2}
      bgcolor={"white"}
      borderRadius={4}
      direction={"column"}
      gap={6}
      p={4}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={2}
      >
        <Box>Order Id: {orderId}</Box>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Box>สถานะ:</Box>
          <Box>
            <OrderStatus name={status}></OrderStatus>
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems={"flex-end"}>
        <Stack flexWrap={"wrap"} gap={1} direction={"row"}>
          <Button
            onClick={() => {
              dispatch(orderIdActions.getOrderById(orderId) as any);
              navigate("/order-detail");
            }}
            size="small"
            sx={{ color: "white", borderRadius: 100 }}
            variant="contained"
          >
            ดูรายละเอียด
          </Button>
          <Button
            disabled={status !== OrderStatusEnum.NOTPAID}
            onClick={() => {
              navigate(`/payment/${orderId}`);
            }}
            size="small"
            sx={{ color: "white", borderRadius: 100 }}
            variant="contained"
          >
            ชำระเงิน
          </Button>
          <Button
            onClick={() => {
              dispatch(orderIdActions.getOrderById(orderId) as any);
              setIsOpen(true);
            }}
            disabled={status !== OrderStatusEnum.NOTPAID}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 100 }}
          >
            ยกเลิกคำสั่งซื้อ
          </Button>
        </Stack>
      </Stack>

      <Modal
        isOpen={isOpen}
        role={ModalRoleEnum.confirmDelete}
        onSubmit={async () => {
          await dispatch(
            orderActions.deleteOrder(orderIdReducer.order?.id) as any
          );

          await dispatch(
            orderActions.getMyOrders(
              loginReducer.authorization?.customer?.id
            ) as any
          );
        }}
        onClose={toggle}
      >
        {orderIdReducer.isFetching ? (
          <>
            <Skeleton animation="wave"></Skeleton>
            <Skeleton animation="wave"></Skeleton>
            <Skeleton animation="wave"></Skeleton>
            <Box sx={{ my: 2 }}></Box>
          </>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <h1 className="modal-title">Confirm delete</h1>
            <Box>Do you want to delete {orderIdReducer.order?.id}?</Box>
          </Box>
        )}
      </Modal>
    </Stack>
  );
};

export default MyOrderCard;
