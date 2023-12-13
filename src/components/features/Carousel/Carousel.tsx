import { Box, IconButton } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Carousel.css";

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => handleScroll(-400)}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        ref={scrollContainerRef}
        className="custom-scrollbar"
        width="615px"
        sx={{ overflowX: "scroll" }}
        padding={"14px"}
        display={"flex"}
        gap={4}
        flexDirection={"row"}
        whiteSpace="nowrap"
      >
        {children}
      </Box>
      <IconButton onClick={() => handleScroll(400)}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
