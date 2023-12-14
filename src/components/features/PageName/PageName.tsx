/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./PageName.css";
import { Box } from "@mui/material";

type PageNameProps = {
  name: string;
};

const PageName: React.FC<PageNameProps> = ({ name }) => {
  return (
    <Box marginBottom={4} fontSize={36} fontWeight={400}>
      {name}
    </Box>
  );
};

export default PageName;
