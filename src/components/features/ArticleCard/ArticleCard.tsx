/* eslint-disable jsx-a11y/alt-text */
import { Box, Stack, useTheme } from "@mui/material";
import * as React from "react";

type Article = {
  title: string;
  image: string;
  reply: number;
};

const ArticleCard: React.FC<Article> = ({ title, image, reply }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} width={695} justifyContent={"space-between"}>
      <Box display={"flex"} gap={2}>
        <img style={{ height: 40, width: 40 }} src={image}></img>
        <Box>{title}</Box>
      </Box>
      <Box color={theme.palette.grey[400]}>ตอบกลับ: {reply}</Box>
    </Stack>
  );
};

export default ArticleCard;
