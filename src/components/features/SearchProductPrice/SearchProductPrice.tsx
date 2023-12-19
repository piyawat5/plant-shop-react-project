import { Box, Input, Stack, TextField } from "@mui/material";
import * as React from "react";

type ParameterPrice = {
  startPrice: number | null;
  endPrice: number | null;
};

type SearchProductPriceProps = {
  handleValue: ({ startPrice, endPrice }: ParameterPrice) => void;
};

const SearchProductPrice: React.FC<SearchProductPriceProps> = ({
  handleValue,
}) => {
  const [startPrice, setStartPrice] = React.useState<number | null>(null);
  const [endPrice, setEndPrice] = React.useState<number | null>(null);
  const isInitialRender = React.useRef(true);

  const startMax = React.useMemo(() => {
    if (startPrice === endPrice) {
      return endPrice === null ? null : endPrice + 1;
    }
    return endPrice;
  }, [startPrice, endPrice]);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (startPrice !== null || endPrice !== null) {
      const getData = setTimeout(() => {
        handleValue({ startPrice, endPrice });
      }, 1000);

      return () => clearTimeout(getData);
    } else {
      handleValue({ startPrice, endPrice });
    }
  }, [startPrice, endPrice]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : +e.target.value;
    setStartPrice(value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : +e.target.value;
    setEndPrice(value);
  };

  return (
    <Stack width={"100%"} direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        type="number"
        fullWidth
        sx={{ bgcolor: "white", minWidth: 100 }}
        InputProps={{ inputProps: { min: 0, max: startMax } }}
        onChange={handleStartChange}
        value={startPrice === null ? "" : startPrice}
        label={"ราคาเริ่มต้น"}
      />
      <Box>-</Box>
      <TextField
        type="number"
        value={endPrice === null ? "" : endPrice}
        sx={{ bgcolor: "white", width: "100%", minWidth: 106 }}
        InputProps={{ inputProps: { min: startPrice } }}
        onChange={handleEndChange}
        label={"ราคาสูงสุด"}
      />
    </Stack>
  );
};

export default SearchProductPrice;
