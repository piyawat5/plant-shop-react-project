import { Box, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import StockForm from "../../features/StockForm";

// type AdminEditStockPageProps = {
//   //
// };

const AdminEditStockPage: React.FC<any> = () => {
  const initial = {
    productName: "",
    price: 1500,
    quantity: 300,
    image: "image/image/image",
  };
  return (
    <Box>
      <Stack alignItems={"center"}>
        <Box maxWidth={428} width={"100%"}>
          <PageName name="แก้ไขสินค้า"></PageName>
        </Box>
      </Stack>

      <StockForm product={initial}></StockForm>
    </Box>
  );
};

export default AdminEditStockPage;
