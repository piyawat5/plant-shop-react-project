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
  const [bgColor, setBgColor] = useState("");
  const [status, setStatus] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    switch (name) {
      case OrderStatusEnum.PAID:
        setBgColor("white");
        setTextColor("#FF8A00");
        setStatus("ชำระเงินแล้ว");
        break;

      case OrderStatusEnum.NOTPAID:
        setBgColor("white");
        setTextColor("#DC2F02");
        setStatus("ยังไม่ได้ชำระเงิน");
        break;
      case OrderStatusEnum.COMPLETE:
        setBgColor("#E2FFD8");
        setTextColor("#007105");
        setStatus("สินค้ากำลังจัดส่ง");
        break;
      case OrderStatusEnum.VERIFY:
        setBgColor("white");

        setTextColor(theme.palette.grey[500]);
        setStatus("กำลังตรวจสอบการชำระเงิน");
        break;
      default:
        setBgColor(theme.palette.error.main);

        setTextColor(theme.palette.error.main);
        setStatus("ยังไม่ชำระเงิน");
        break;
    }
  }, []);

  return (
    <Box
      color={textColor}
      bgcolor={bgColor}
      border={`1px solid ${textColor}`}
      borderRadius={50}
      p={"4px 8px"}
      sx={{ backgroundColor: bgColor }}
    >
      {status}
    </Box>
  );
};

export default OrderStatus;
