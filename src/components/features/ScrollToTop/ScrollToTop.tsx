/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {};

const ScrollToTop: React.FC<ScrollToTopProps> = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
