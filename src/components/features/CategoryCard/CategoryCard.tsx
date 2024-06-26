/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/material";
import * as React from "react";

type CategoryCardProps = {
  title: string;
  image: string;
  handleClick: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  handleClick,
}) => {
  return (
    <Box
      onClick={handleClick}
      width={"100%"}
      sx={{ cursor: "pointer" }}
      textAlign={"center"}
      padding={"14px"}
      bgcolor={"white"}
      height={170}
      boxShadow={2}
      borderRadius={2}
    >
      <Box width={"100%"} marginBottom={2}>
        {title}
      </Box>
      <img style={{ height: 100 }} src={image}></img>
    </Box>
  );
};

export default CategoryCard;
