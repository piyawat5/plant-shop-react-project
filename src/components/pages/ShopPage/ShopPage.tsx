import { Box } from "@mui/material";
import * as React from "react";
import ProductTypeDropdown from "../../features/ProductTypeDropdown";
import SearchProductName from "../../features/SearchProductName";
import SearchProductPrice from "../../features/SearchProductPrice";

// type ShopPageProps = {
//   //
// };

const ShopPage: React.FC<any> = () => {
  const [searchProductName, setSearchProductName] = React.useState("");
  const [searchProductType, setSearchProductType] = React.useState("");
  const [searchProductPrice, setSearchProductPrice] = React.useState({});
  React.useEffect(() => {
    if (!searchProductName && !searchProductPrice && !searchProductType) {
      return;
    } else {
      console.log(searchProductName, searchProductType, searchProductPrice);
    }
  }, [searchProductName, searchProductType, searchProductPrice]);
  return (
    <Box>
      <ProductTypeDropdown
        handleValue={setSearchProductType}
      ></ProductTypeDropdown>
      <SearchProductName handleValue={setSearchProductName}></SearchProductName>
      <SearchProductPrice
        handleValue={setSearchProductPrice}
      ></SearchProductPrice>
    </Box>
  );
};

export default ShopPage;
