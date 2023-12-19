/* eslint-disable jsx-a11y/alt-text */
import { Box, TextField } from "@mui/material";
import * as React from "react";

type SearchInputProps = {
  handleValue: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ handleValue }) => {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const getData = setTimeout(() => {
      handleValue(search);
    }, 1000);

    return () => clearTimeout(getData);
  }, [search]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearch("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <TextField
      fullWidth
      sx={{ bgcolor: "white" }}
      label="ค้นหาชื่อสินค้า"
      value={search}
      variant="outlined"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    ></TextField>
  );
};

export default SearchInput;
