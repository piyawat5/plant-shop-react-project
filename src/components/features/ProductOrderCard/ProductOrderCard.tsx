/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./ProductOrderCard.css";
import { Box, Stack } from "@mui/material";

type ProductOrderCardProps = {
  productName: string;
  quantity: number;
  price: number;
  image: string;
  handleClick?: () => void;
};

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  productName,
  quantity,
  price,
  image,
  handleClick,
}) => {
  return (
    <Stack
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
      direction={"row"}
      alignItems={"center"}
      width={"100%"}
      spacing={1}
      maxWidth={571}
    >
      <Stack
        width={"100%"}
        boxShadow={2}
        bgcolor={"white"}
        borderRadius={4}
        direction={"row"}
        pr={4}
        alignItems={"center"}
      >
        <Box width={100}>
          <img height={100} alt={productName} src={image}></img>
        </Box>
        <Stack width={"100%"} spacing={1} direction={"column"}>
          <Box fontSize={20}>{productName}</Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <span>จำนวน: </span>
              {quantity}
            </Box>
            <Box>{price}</Box>
          </Stack>
        </Stack>
      </Stack>
      <Box>D</Box>
    </Stack>
  );
};

export default ProductOrderCard;
