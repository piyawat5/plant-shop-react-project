/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./MyOrderCard.css";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

type MyOrderCardProps = {};

const MyOrderCard: React.FC<MyOrderCardProps> = () => {
  const navigate = useNavigate();
  return (
    <Stack
      width={"100%"}
      maxWidth={700}
      boxShadow={2}
      bgcolor={"white"}
      borderRadius={4}
      direction={"column"}
      spacing={3}
      p={4}
    >
      <Box>Order Id: 1</Box>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Box>เวลาในการสั่งซื้อ: 12/12/23 12:30</Box>
        <Box>สถานะ ยังไม่ได้ชำระเงิน</Box>
      </Stack>
      <Stack alignItems={"flex-end"}>
        <Stack spacing={1} direction={"row"}>
          <Button
            onClick={() => navigate("/order-detail")}
            size="small"
            sx={{ color: "white", borderRadius: 100 }}
            variant="contained"
          >
            ดูรายละเอียด
          </Button>
          <Button
            onClick={() => navigate("/payment")}
            size="small"
            sx={{ color: "white", borderRadius: 100 }}
            variant="contained"
          >
            ชำระเงิน
          </Button>
          <Button size="small" variant="outlined" sx={{ borderRadius: 100 }}>
            ยกเลิกคำสั่งซื้อ
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyOrderCard;
