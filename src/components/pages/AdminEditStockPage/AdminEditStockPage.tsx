import { Box, Stack } from "@mui/material";
import * as React from "react";
import PageName from "../../features/PageName";
import StockForm from "../../features/StockForm";
import { useMatch } from "react-router-dom";
import * as productIdAction from "../../../redux/actions/productId.action";
import { useAppDispatch } from "../../..";

// type AdminEditStockPageProps = {
//   //
// };

const AdminEditStockPage: React.FC<any> = () => {
  const match = useMatch("/admin-edit-stock/:id");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    match?.params.id &&
      dispatch(productIdAction.productIdAction(+match?.params.id) as any);
  }, []);
  return (
    <Box>
      <Stack alignItems={"center"}>
        <Box maxWidth={428} width={"100%"}>
          <PageName name="แก้ไขสินค้า"></PageName>
        </Box>
      </Stack>
      <StockForm action="EDIT"></StockForm>
    </Box>
  );
};

export default AdminEditStockPage;
