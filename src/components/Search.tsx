import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchWeather } from "../redux/weatherSlice";
import useActions from "../hooks/useActions";

export const SearchBtn = {
  height: 40,
  color: "var(--main-text-color)",
  borderColor: "var(--main-text-color)",
  ":hover": {
    color: "var(--main-hover-color)",
    borderColor: "var(--main-hover-color)",
  },
};

export const SearchField = styled(TextField)({
  "& label": { color: "var(--main-text-color)", bgcolor: "red" },
  "& label.Mui-focused": {
    color: "var(--main-hover-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--main-text-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--main-text-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--main-hover-color)",
    },
  },
  input: { color: "var(--main-text-color)" },
});

const Search: React.FC = () => {
  const err = useAppSelector((state) => state.main.error);
  const cityName = useAppSelector((state) => state.main.cityName);
  const dispatch = useAppDispatch();

  const { setCityName } = useActions();

  const handleSearch = () => dispatch(fetchWeather(cityName));

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" alignItems="center">
        <SearchField
          label="Weather in your city"
          variant="outlined"
          size="small"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />

        <Box
          component="p"
          fontSize=".6rem"
          sx={{
            opacity: err ? 1 : 0,
            marginTop: "5px",
          }}
        >
          error:
          {err?.message}
        </Box>
      </Box>

      <Button
        variant="outlined"
        sx={{ ...SearchBtn }}
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        search
      </Button>
    </Box>
  );
};

export default Search;
