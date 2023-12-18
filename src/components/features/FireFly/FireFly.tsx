/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/material";
import * as React from "react";
import "./FireFly.css";

type FireFlyProps = {};

const FireFly: React.FC<FireFlyProps> = () => {
  return (
    <Box position={"absolute"} zIndex={10} className="FireFly-animation1"></Box>
  );
};

export default FireFly;
