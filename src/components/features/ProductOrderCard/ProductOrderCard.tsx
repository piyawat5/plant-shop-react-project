/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./ProductOrderCard.css";
import { Box, IconButton, Stack } from "@mui/material";
import { NumericFormat } from "react-number-format";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type ProductOrderCardProps = {
  productName: string;
  quantity: number;
  price: number;
  image: string;
  viewMode?: boolean;
  handleClickProduct?: () => void;
  handleClickDelete?: () => void;
};

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  productName,
  quantity,
  price,
  image,
  viewMode = false,
  handleClickProduct,
  handleClickDelete,
}) => {
  return (
    <Stack
      sx={{ cursor: viewMode ? "inherit" : "pointer" }}
      direction={"row"}
      alignItems={"center"}
      width={"100%"}
      spacing={1}
      maxWidth={571}
    >
      <Stack
        onClick={handleClickProduct}
        gap={1}
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
          <Stack
            direction={"row"}
            gap={1}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box>
              <span>จำนวน: </span>
              {quantity}
            </Box>
            <Box>
              ราคารวมของสินค้าชิ้นนี้{" "}
              <NumericFormat
                value={price}
                displayType={"text"}
                thousandSeparator
                fixedDecimalScale
                suffix=" บาท"
                decimalScale={0}
              ></NumericFormat>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {!viewMode && (
        <Box onClick={handleClickDelete}>
          <IconButton>
            <DeleteForeverIcon
              sx={{ color: "rgb(201, 45, 45)" }}
            ></DeleteForeverIcon>
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default ProductOrderCard;
