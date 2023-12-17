/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./OrderStatus.css";
import { Box, useTheme } from "@mui/material";
import { OrderStatusEnum } from "../../types/OrderStatus";

type OrderStatusProps = {
  name: OrderStatusEnum;
};

const OrderStatus: React.FC<OrderStatusProps> = ({ name }) => {
  const theme = useTheme();
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    switch (name) {
      case OrderStatusEnum.PAID:
        setColor(theme.palette.secondary.main);
        setStatus("ชำระเงินแล้ว");
        break;

      case OrderStatusEnum.NOTPAID:
        setColor(theme.palette.error.main);
        setTextColor("white");
        setStatus("ยังไม่ได้ชำระเงิน");
        break;
      case OrderStatusEnum.COMPLETE:
        setColor(theme.palette.success.main);
        setStatus("สินค้ากำลังจัดส่ง");
        break;
      case OrderStatusEnum.VERIFY:
        setColor(theme.palette.grey[300]);
        setStatus("กำลังตรวจสอบการชำระเงิน");
        break;
      default:
        setColor(theme.palette.error.main);
        setStatus("ยังไม่ชำระเงิน");
        break;
    }
  }, []);

  return (
    <Box
      color={name === OrderStatusEnum.NOTPAID ? "white" : ""}
      borderRadius={50}
      p={"4px 8px"}
      sx={{ backgroundColor: color }}
    >
      {status}
    </Box>
  );
};

export default OrderStatus;
