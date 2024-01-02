/* eslint-disable jsx-a11y/alt-text */
import { Box, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../redux/reducers";

type SearchInputProps = {
  handleValue: (value: string) => void;
  label?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  handleValue,
  label = "ค้นหา",
}) => {
  const [search, setSearch] = React.useState("");
  const clearSearchReducer = useSelector(
    (state: RootReducers) => state.clearSearchReducer
  );

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

  React.useEffect(() => {
    setSearch("");
  }, [clearSearchReducer]);

  return (
    <TextField
      fullWidth
      sx={{ bgcolor: "white" }}
      label={label}
      value={search}
      variant="outlined"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    ></TextField>
  );
};

export default SearchInput;
