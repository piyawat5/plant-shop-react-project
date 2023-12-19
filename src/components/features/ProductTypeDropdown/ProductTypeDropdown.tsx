/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type ProductTypeDropdownProps = {
  handleValue: (value: string) => void;
  searchQuery?: string | null;
};

const ProductTypeDropdown: React.FC<ProductTypeDropdownProps> = ({
  handleValue,
  searchQuery = "",
}) => {
  const initial = "";
  const [value, setValue] = React.useState(initial);
  React.useEffect(() => {
    if (searchQuery) {
      setValue(searchQuery);
    }
  }, []);

  React.useEffect(() => {
    handleValue(value);
  }, [value]);

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
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <MenuItem value={""}>ทั้งหมด</MenuItem>
        <MenuItem value={"TREE"}>ต้นไม้</MenuItem>
        <MenuItem value={"SEED"}>เมล็ด</MenuItem>
        <MenuItem value={"EQUIPMENT"}>อุปกรณ์</MenuItem>
        <MenuItem value={"INSECTICIDE"}>ยากำจัดวัชพืช</MenuItem>
        <MenuItem value={"SOIL"}>ดิน & ปุ๋ย</MenuItem>
        <MenuItem value={"DECORATION"}>ของตกแต่ง</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProductTypeDropdown;
