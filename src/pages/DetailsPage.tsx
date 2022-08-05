import React from "react";
import { Container, IconButton, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import Grid from "@mui/material/Grid/Grid";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import useActions from "../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ChartApp from "../components/ChartApp";
import { fetchForecast, fetchWeather } from "../redux/weatherSlice";
import DetailsItem from "../components/DetailsItem";
import Preloader from "../components/Preloader";

const DetailsPage: React.FC = () => {
  const { cityName } = useParams();
  const { isOpenDetails } = useActions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.main.weatherData.find((w) => w.name === cityName));
  const units = useAppSelector((state) => state.main.units);
  const hourly = useAppSelector((state) => state.main?.forecast?.hourly);
  const isLoading = useAppSelector((state) => state.main.isLoading);

  const speed = units === "metric" ? "m/s" : "mph";
  const deg = units === "metric" ? "°C" : "°F";
  const press = units === "metric" ? "mmHg" : "hPa";

  const goBack = () => navigate(-1);

  const refreshDetailsWeather = () => {
    if (cityName) {
      dispatch(fetchWeather(cityName));
      if (data) {
        dispatch(fetchForecast({ lat: data.lat, lon: data.lon }));
      }
    }
  };

  React.useEffect(() => {
    if (data) {
      dispatch(fetchForecast({ lat: data.lat, lon: data.lon }));
    }
    isOpenDetails(true);
    return () => {
      isOpenDetails(false);
    };
  }, [units]);

  const items = [
    { title: "Min temp:", value: `${data?.tempMin}${deg}`, icon: <DeviceThermostatOutlinedIcon /> },
    { title: "Max temp:", value: `${data?.tempMax}${deg}`, icon: <DeviceThermostatOutlinedIcon /> },
    { title: "Humidity", value: `${data?.humidity}%`, icon: <GrainRoundedIcon /> },
    {
      title: "Feels like:",
      value: `${data?.feelsLike}${deg}`,
      icon: <FlutterDashIcon />,
    },
    { title: "Sunset", value: `${data?.sunset}`, icon: <WbTwilightOutlinedIcon /> },
    { title: "Wind", value: `${data?.windSpeed}${speed}`, icon: <AirRoundedIcon /> },
    { title: "Sunrise", value: `${data?.sunrise}`, icon: <WbSunnyOutlinedIcon /> },
    {
      title: "Pressure:",
      value: `${
        units === "metric" ? Math.round((data?.pressure ?? 1) * 0.75) : data?.pressure
      }${press}`,
      icon: <WavesRoundedIcon />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper sx={{ bgcolor: "var(--details-bgcolor)", borderRadius: "10px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" borderRadius="10px">
          <IconButton onClick={goBack}>
            <ArrowBackIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Typography
            component="h2"
            variant="button"
            align="center"
            fontWeight="bold"
            fontSize="2rem"
          >
            Details weather information
          </Typography>

          <IconButton>
            <RefreshIcon sx={{ fontSize: "2rem" }} onClick={refreshDetailsWeather} />
          </IconButton>
        </Box>

        <Box>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap-reverse" margin={2}>
            <Grid container item lg={6} justifyContent="space-around">
              {items.map((i) => (
                <DetailsItem key={i.title} title={i.title} value={i.value} icon={i.icon} />
              ))}
            </Grid>

            <Grid
              item
              lg={2}
              marginBottom={2}
              padding={1}
              minWidth={250}
              borderRadius={10}
              boxShadow="0px 5px 10px 2px #ece89f"
              display="inline-flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                component="h3"
                variant="button"
                align="center"
                fontSize="1.5rem"
                letterSpacing={1}
              >
                {data?.name}
              </Typography>
              <Typography
                component="h3"
                variant="button"
                align="center"
                fontSize="1.5rem"
                letterSpacing={1}
              >
                {data?.country}
              </Typography>

              <Typography component="h3" variant="overline">
                {data?.detailsWeather}
              </Typography>
              {isLoading ? (
                <Box component="div" width={150} height={150}>
                  <Preloader />
                </Box>
              ) : (
                <Box component="img" alt="Weather icon" src={data?.icon} width={150} height={150} />
              )}

              <Typography component="h3" variant="overline" fontSize="2rem">
                {`${data?.temp}${deg}`}
              </Typography>
            </Grid>
          </Box>

          <Box padding={1} height="220px" width="100%" marginBottom={2}>
            <ChartApp hourly={hourly} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DetailsPage;
