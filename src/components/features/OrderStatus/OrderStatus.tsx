/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./OrderStatus.css";
import { Box } from "@mui/material";

type OrderStatusProps = {
  name: string;
};

const OrderStatus: React.FC<OrderStatusProps> = ({ name }) => {
  return (
    <Box marginBottom={4} fontSize={36} fontWeight={400}>
      {name}
    </Box>
  );
};

export default OrderStatus;
