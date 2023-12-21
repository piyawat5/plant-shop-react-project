/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RootReducers } from "../../../redux/reducers";
import { useSelector } from "react-redux";

type ProductTypeDropdownProps = {
  handleValue: (value: string) => void;
  searchQuery?: string | null;
  required?: boolean;
};

const ProductTypeDropdown: React.FC<ProductTypeDropdownProps> = ({
  handleValue,
  searchQuery = "",
  required = false,
}) => {
  const initial = "";
  const [value, setValue] = React.useState(initial);
  const clearSearchReducer = useSelector(
    (state: RootReducers) => state.clearSearchReducer
  );
  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (searchQuery) {
      setValue(searchQuery);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    handleValue(value);
  }, [value]);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setValue("");
  }, [clearSearchReducer]);

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
      <Select
        fullWidth
        sx={{ bgcolor: "white" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="ประเภท"
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <MenuItem value={""}>ทั้งหมด</MenuItem>
        <MenuItem value={"Tree"}>ต้นไม้</MenuItem>
        <MenuItem value={"Seed"}>เมล็ด</MenuItem>
        <MenuItem value={"Equipment"}>อุปกรณ์</MenuItem>
        <MenuItem value={"Insecticide"}>ยากำจัดวัชพืช</MenuItem>
        <MenuItem value={"Soil"}>ดิน & ปุ๋ย</MenuItem>
        <MenuItem value={"Decoration"}>ของตกแต่ง</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProductTypeDropdown;
