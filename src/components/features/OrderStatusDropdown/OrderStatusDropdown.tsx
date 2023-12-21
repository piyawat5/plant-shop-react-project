/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OrderStatusEnum } from "../../types/OrderStatus";
import * as clearActions from "../../../redux/actions/clearSearch.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

type OrderStatusDropdownProps = {
  handleValue: (value: string) => void;
};

const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({
  handleValue,
}) => {
  const [value, setValue] = React.useState("");

  const clearReducer = useSelector(
    (state: RootReducers) => state.clearSearchReducer
  );

  React.useEffect(() => {
    handleValue(value);
  }, [value]);

  React.useEffect(() => {
    setValue("");
  }, [clearReducer]);

  return (
    <Box sx={{ minWidth: 236 }} width={"100%"}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
        <Select
          sx={{ bgcolor: "white" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="ประเภท"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <MenuItem value={""}>ทั้งหมด</MenuItem>
          <MenuItem value={OrderStatusEnum.NOTPAID}>ยังไม่ได้ชำระเงิน</MenuItem>
          <MenuItem value={OrderStatusEnum.PAID}>ชำระเงินแล้ว</MenuItem>
          <MenuItem value={OrderStatusEnum.VERIFY}>
            รอการตรวจสอบกำชำระเงิน
          </MenuItem>

          <MenuItem value={OrderStatusEnum.COMPLETE}>
            สินค้ากำลังจัดส่ง
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default OrderStatusDropdown;
