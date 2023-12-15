import { Box, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import MyOrderCard from "../../features/MyOrderCard";

// type MyOrderPageProps = {
//   //
// };

const MyOrderPage: React.FC<any> = () => {
  return (
    <Box>
      <PageName name="รายการสั่งซื้อ"></PageName>
      <Stack gap={3} alignItems={"center"}>
        <MyOrderCard></MyOrderCard>
        <MyOrderCard></MyOrderCard>
        <MyOrderCard></MyOrderCard>
        <MyOrderCard></MyOrderCard>
        <MyOrderCard></MyOrderCard>
        <MyOrderCard></MyOrderCard>
      </Stack>
    </Box>
  );
};

export default MyOrderPage;
