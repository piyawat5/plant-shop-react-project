import { Box, Stack, useTheme } from "@mui/material";
import * as React from "react";

type ProductCardProps = {
  productName: string;
  price: number;
  stock: number;
  favorite?: boolean;
  image?: string;
  handleClick?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  price,
  stock,
  favorite,
  image,
  handleClick,
}) => {
  const theme = useTheme();
  return (
    <Box
      borderRadius={4}
      onClick={handleClick}
      sx={{
        bgcolor: "white",
        width: "220px",
        height: "280px",
        boxShadow: 3,
        padding: "14px",
        cursor: "pointer",
      }}
    >
      <Stack justifyContent={"center"} gap={"14px"}>
        <img
          src={image}
          alt="tree"
          style={{ margin: "auto", height: "158px" }}
        />
        <Box sx={{ fontSize: "14px", color: theme.palette.grey[500] }}>
          Stock: {stock}
        </Box>
        <Stack
          sx={{ fontWeight: 500 }}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Box>Product name</Box>
          <Box>${price}</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
