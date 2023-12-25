/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./NumberEditor.css";
import { Box, Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

type NumberEditorProps = {
  handleValue: (value: number) => void;
};

const NumberEditor: React.FC<NumberEditorProps> = ({ handleValue }) => {
  const cartReducer = useSelector((state: RootReducers) => state.cartReducer);
  const productIdReducer = useSelector(
    (state: RootReducers) => state.productIdReducer
  );

  let init = 1;
  const [value, setValue] = useState(init);
  const theme = useTheme();

  useEffect(() => {
    let checkExistingOrder = cartReducer.order?.orderDetail.findIndex(
      (item: any) => item.product?.id === productIdReducer.product?.id
    );

    init =
      checkExistingOrder > -1
        ? cartReducer.order?.orderDetail[checkExistingOrder]?.quantity
        : 1;
    if (init > 1) {
      setValue(init);
    }
  }, [productIdReducer, cartReducer]);

  useEffect(() => {
    handleValue(value);
  }, [value]);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        className={"prevent-select"}
        p={"0px 8px"}
        bgcolor={theme.palette.primary.main}
        color={"white"}
        textAlign={"center"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          if (value) {
            setValue(value - 1);
          }
        }}
      >
        -
      </Box>
      <input
        style={{ width: 30, height: 20, border: "none", textAlign: "center" }}
        type="number"
        disabled
        value={value}
        onChange={(e) => {
          setValue(+e.target.value);
        }}
      ></input>
      <Box
        p={"0px 8px"}
        className={"prevent-select"}
        sx={{ cursor: "pointer" }}
        bgcolor={theme.palette.primary.main}
        textAlign={"center"}
        color={"white"}
        onClick={() => {
          setValue(value + 1);
        }}
      >
        +
      </Box>
    </Stack>
  );
};

export default NumberEditor;
