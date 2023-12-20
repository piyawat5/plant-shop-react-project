/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/material";
import * as React from "react";
import "./FireFly.css";

type FireFlyProps = {};

const FireFly: React.FC<FireFlyProps> = () => {
  return (
    <Box width={"100%"}>
      <Box
        position={"absolute"}
        zIndex={10}
        className="FireFly FireFly-animation1"
      ></Box>
      <Box
        position={"absolute"}
        zIndex={10}
        className="FireFly FireFly-animation2"
      ></Box>
      <Box
        position={"absolute"}
        zIndex={10}
        className="FireFly FireFly-animation3"
      ></Box>
      <Box
        position={"absolute"}
        zIndex={10}
        className="FireFly FireFly-animation4"
      ></Box>
    </Box>
  );
};

export default FireFly;
