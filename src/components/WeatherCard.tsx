import React from "react";
import {
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Preloader from "./Preloader";
import { useAppSelector } from "../hooks/redux";
import useActions from "../hooks/useActions";

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
  const { setFalse } = useActions();
  const units = useAppSelector((state) => state.main.units);
  const deg = units === "metric" ? "°C" : "°F";

  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    if (refresh) {
      setUpdate(false);
      setFalse();
    }
  }, [refresh]);
  return (
    <Grid item container lg={4} marginTop={2} justifyContent="center">
      <Card
        sx={{
          width: 270,
          minHeight: 330,
          maxHeight: 400,
          backgroundColor: "var(--card-bg-color)",
          color: "var(--main-text-color)",
        }}
      >
        <CardActionArea
          disabled={update}
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
                      setUpdate(true);
                    }}
                  >
                    <RefreshIcon sx={{ color: "var(--card-btn-color)" }} />
                  </IconButton>
                </Tooltip>

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
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={0.5}
                  >
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon fontSize="small" />
                      <Typography
                        marginLeft={1}
                        variant="button"
                        sx={{
                          color: "var(--main-text-color)",
                          fontSize: "1.2rem",
                          letterSpacing: 1,
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="button"
                      sx={{
                        color: "var(--main-text-color)",
                        fontSize: "1.2rem",
                        letterSpacing: 1,
                      }}
                    >
                      {country}
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
            <Typography flexGrow={1} marginLeft={2} variant="subtitle2" sx={{ fontSize: "1.5rem" }}>
              Feels like:
            </Typography>
            <Typography variant="subtitle2" marginRight={2} sx={{ fontSize: "2rem" }}>
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
