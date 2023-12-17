/* eslint-disable jsx-a11y/alt-text */
import { Box, Input, Stack, TextField } from "@mui/material";
import * as React from "react";

type ParameterPrice = {
  startPrice: number;
  endPrice: number;
};

type SearchProductPriceProps = {
  handleValue: ({ startPrice, endPrice }: ParameterPrice) => void;
};

const SearchProductPrice: React.FC<SearchProductPriceProps> = ({
  handleValue,
}) => {
  const [startPrice, setStartPrice] = React.useState<number>(0);
  const [endPrice, setEndPrice] = React.useState<number>(100000);
  const startMax = () => {
    if (startPrice === endPrice) {
      setEndPrice((prev) => prev + 1);
    }
    return endPrice;
  };

  React.useEffect(() => {
    if (startPrice !== 0 || endPrice !== 0) {
      const getData = setTimeout(() => {
        handleValue({ startPrice, endPrice });
      }, 1000);

      return () => clearTimeout(getData);
    } else {
      handleValue({ startPrice, endPrice });
    }
  }, [startPrice, endPrice]);
  return (
    <Stack width={"100%"} direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        type="number"
        fullWidth
        sx={{ bgcolor: "white", minWidth: 100 }}
        InputProps={{ inputProps: { min: 0, max: startMax() } }}
        onChange={(e) => {
          setStartPrice(+e.target.value);
        }}
        value={startPrice}
        label={"ราคาเริ่มต้น"}
      ></TextField>
      <Box>-</Box>
      <TextField
        type="number"
        value={endPrice}
        sx={{ bgcolor: "white", width: "100%", minWidth: 106 }}
        InputProps={{ inputProps: { min: startPrice } }}
        onChange={(e) => {
          setEndPrice(+e.target.value);
        }}
        label={"ราคาสูงสุด"}
      ></TextField>
    </Stack>
  );
};

export default SearchProductPrice;
