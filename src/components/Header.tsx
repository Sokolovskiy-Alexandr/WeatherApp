import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, Tooltip } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import useActions from "../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Search from "./Search";
import api from "../api/api";
import { fetchWeather } from "../redux/weatherSlice";

const OptionCssBtn = {
  fontSize: 10,
  width: 95,
  height: 30,
  borderColor: "var(--main-text-color)",
  color: "var(--main-text-color)",
  ":hover": {
    color: "var(--main-hover-color)",
    borderColor: "var(--main-hover-color)",
  },
};

const Header: React.FC = () => {
  const { switchMetric, switchImperial } = useActions();
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.main.units);
  const isOpenDetails = useAppSelector((state) => state.main.isOpenDetails);

  const getCurrentCityName = async () => {
    try {
      const response = await api.getCoordFromIp();
      const cityName = response.data.city;
      dispatch(fetchWeather(cityName));
    } catch (error) {
      console.error("Geo Error");
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "var(--header-bgcolor)", marginBottom: 1 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center" minHeight={80}>
          <Grid item container md={4} justifyContent="center">
            <Typography
              variant="h6"
              component="div"
              letterSpacing={5}
              color="var(--main-text-color)"
            >
              WEATHER
            </Typography>
          </Grid>

          <Grid
            item
            container
            md={4}
            justifyContent="center"
            alignItems="center"
            alignSelf="flex-end"
          >
            {!isOpenDetails && <Search />}
          </Grid>

          <Grid item container md={4} justifyContent="center">
            {!isOpenDetails && (
              <Tooltip title="Get Your Location">
                <Button
                  variant="outlined"
                  onClick={getCurrentCityName}
                  sx={{
                    ...OptionCssBtn,
                    borderRadius: "10px",
                    marginRight: "5px",
                    width: 40,
                  }}
                >
                  <NearMeIcon />
                </Button>
              </Tooltip>
            )}

            <Tooltip title="Switch to Metric">
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: units === "metric" ? "var(--header-active-btn-bgcolor)" : "",
                  marginRight: "2px",
                  borderBottomLeftRadius: "10px",
                  borderTopLeftRadius: "10px",
                  ...OptionCssBtn,
                }}
                onClick={() => switchMetric()}
              >
                Metric: °C
              </Button>
            </Tooltip>
            <Tooltip title="Switch to Imperial">
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: units === "imperial" ? "var(--header-active-btn-bgcolor)" : "",
                  borderBottomRightRadius: "10px",
                  borderTopRightRadius: "10px",
                  ...OptionCssBtn,
                }}
                onClick={() => switchImperial()}
              >
                Imperial: °F
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
