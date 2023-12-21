import { Box, Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import StockForm from "../../features/StockForm";

// type AdminAddStockPageProps = {
//   //
// };

const AdminAddStockPage: React.FC<any> = () => {
  return (
    <Box>
      <Stack alignItems={"center"}>
        <Box maxWidth={428} width={"100%"}>
          <PageName name="เพิ่มสินค้า"></PageName>
        </Box>
      </Stack>

      <StockForm action="ADD"></StockForm>
    </Box>
  );
};

export default AdminAddStockPage;
