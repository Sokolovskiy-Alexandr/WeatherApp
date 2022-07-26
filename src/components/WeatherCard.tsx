/* eslint-disable */
import React from "react";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Card from "@mui/material/Card/Card";
import { CardActionArea, CardHeader, CardMedia, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Preloader from "./Preloader";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type WeatherCardPropsType = {
  id: number;
  name: string;
  country: string;
  detailsWeather: string;
  temp: string;
  icon: string;
  feelsLike: number;
  updateWeather: (cityName: string) => void;
  closeCard: (id: number) => void;
  refresh?: boolean;
};

const WeatherCard: React.FC<WeatherCardPropsType> = (props) => {
  const {
    id,
    name,
    country,
    detailsWeather,
    updateWeather,
    closeCard,
    temp,
    icon,
    feelsLike,
    refresh,
  } = props;

  const units = useAppSelector((state) => state.main.units);
  const isLoading = useAppSelector((state) => state.main.isLoading);
  const deg = units === "metric" ? "°C" : "°F";

  const [update, setUpdate] = React.useState(false);

  return (
    <Grid item container md={4} marginTop={2} justifyContent="center">
      <Card
        sx={{
          width: 270,
          height: 300,
          backgroundColor: "#242324",
          color: "var(--main-text-color)",
        }}
      >
        <CardActionArea
          disabled={isLoading}
          component={Link}
          to={`details/${name}`}
          sx={{ height: "100%" }}
        >
          {update ? (
            <Preloader />
          ) : (
            <>
              <Box display="flex" justifyContent="space-between">
                <Tooltip title="Refresh Weather">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateWeather(name);
                    }}
                  >
                    <RefreshIcon sx={{ color: "var(--card-btn-color)" }} />
                  </IconButton>
                </Tooltip>

                <Typography
                  variant="button"
                  sx={{
                    color: "var(--main-text-color)",
                  }}
                >
                  {name}, {country}
                </Typography>

                <Tooltip title="Close Card">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      closeCard(id);
                    }}
                  >
                    <CloseIcon sx={{ color: "var(--card-btn-color)" }} />
                  </IconButton>
                </Tooltip>
              </Box>

              <CardHeader
                sx={{ padding: 1, color: "var(--main-text-color)", textAlign: "center" }}
                title={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={0.5}
                  >
                    <LocationOnIcon fontSize="small" />
                    <Typography
                      variant="button"
                      sx={{
                        color: "var(--main-text-color)",
                        fontSize: "1.2rem",
                        letterSpacing: 3,
                      }}
                    >
                      {name}, {country}
                    </Typography>
                  </Box>
                }
                subheader={
                  <Typography
                    variant="button"
                    sx={{ color: "var(--main-text-color)", fontSize: "0.8rem" }}
                  >
                    {detailsWeather}
                  </Typography>
                }
              />

              <Box component="div" display="flex" alignItems="center" marginBottom="10px">
                <Typography fontSize="3.5rem" flexGrow={1} marginLeft={2} variant="subtitle2">
                  {temp}
                  {deg}
                </Typography>

                <CardMedia
                  sx={{ maxWidth: 100, maxHeight: 100 }}
                  component="img"
                  height="200"
                  image={icon}
                  alt="weather icon"
                />
              </Box>
            </>
          )}
          <Box display="flex" alignItems="center">
            <Typography flexGrow={1} marginLeft={2} variant="subtitle2" sx={{ fontSize: "2rem" }}>
              Feels like:
            </Typography>
            <Typography variant="subtitle2" marginRight={2} sx={{ fontSize: "2.5rem" }}>
              {feelsLike}
              {deg}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
