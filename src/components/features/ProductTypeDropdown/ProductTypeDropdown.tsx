/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";

type ProductTypeDropdownProps = {
  handleValue: (value: string) => void;
};

const ProductTypeDropdown: React.FC<ProductTypeDropdownProps> = ({
  handleValue,
}) => {
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    handleValue(value);
  }, [value]);
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
          <MenuItem value={"TREE"}>ต้นไม้</MenuItem>
          <MenuItem value={"SOIL"}>ดิน & ปุ๋ย</MenuItem>
          <MenuItem value={"MEDICINE"}>ยากำจัดแมลง</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductTypeDropdown;
