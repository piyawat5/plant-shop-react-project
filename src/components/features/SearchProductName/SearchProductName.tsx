/* eslint-disable jsx-a11y/alt-text */
import { Box, TextField } from "@mui/material";
import * as React from "react";

type SearchProductNameProps = {
  handleValue: (value: string) => void;
};

const SearchProductName: React.FC<SearchProductNameProps> = ({
  handleValue,
}) => {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        handleValue(search);
      }, 1000);

      return () => clearTimeout(getData);
    } else {
      handleValue(search);
    }
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
      sx={{ bgcolor: "white" }}
      label="ค้นหาชื่อสินค้า"
      fullWidth
      value={search}
      variant="outlined"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    ></TextField>
  );
};

export default SearchProductName;
