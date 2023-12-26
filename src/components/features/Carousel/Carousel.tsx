import { Box, IconButton } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Carousel.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../..";
import * as carouselActions from "../../../redux/actions/carousel.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

type CarouselProps = {
  children: React.ReactNode;

  position: boolean;
};

const Carousel: React.FC<CarouselProps> = ({ children, position }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPositionX, setScrollPositionX] = useState(0);
  const dispatch = useAppDispatch();
  const carouselPositionReducer = useSelector(
    (state: RootReducers) => state.carouselReducer
  );

  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleContainerScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPositionX(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    //Logic for protect re-rendering scrollX after add to cart
    if (
      !position &&
      scrollContainerRef.current &&
      carouselPositionReducer.positionX !== 0
    ) {
      scrollContainerRef.current.scrollTo({
        left: carouselPositionReducer.positionX,
        behavior: "smooth",
      });
      return;
    }
    dispatch(carouselActions.positionX(scrollPositionX) as any);
  }, [position]);

  return (
    <Box width={"100%"} display="flex" alignItems="center">
      <IconButton onClick={() => handleScroll(-400)}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        onScroll={handleContainerScroll}
        width={"100%"}
        ref={scrollContainerRef}
        className="custom-scrollbar"
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
