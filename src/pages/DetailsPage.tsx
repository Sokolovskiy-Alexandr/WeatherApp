import React from "react";
import { Container, IconButton, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import useActions from "../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import DetailsItem from "../components/DetailsItem";
import ChartApp from "../components/ChartApp";
import { fetchForecast } from "../redux/weatherSlice";

const DetailsPage: React.FC = () => {
  const { cityName } = useParams();
  const { isOpenDetails } = useActions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.main.weatherData.find((w) => w.name === cityName));
  const units = useAppSelector((state) => state.main.units);
  const hourly = useAppSelector((state) => state.main?.forecast?.hourly);

  const speed = units === "metric" ? "m/s" : "mph";
  const deg = units === "metric" ? "°C" : "°F";
  const press = units === "metric" ? "mmHg" : "hPa";

  const goBack = () => navigate(-1);

  React.useEffect(() => {
    if (data) {
      dispatch(fetchForecast({ lat: data.lat, lon: data.lon }));
    }
    isOpenDetails(true);
    return () => {
      isOpenDetails(false);
    };
  }, [units]);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ bgcolor: "var(--details-bgcolor)" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton sx={{ marginLeft: 1, marginTop: 1 }} onClick={goBack}>
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

          <IconButton sx={{ marginTop: 1, marginRight: 1 }}>
            <RefreshIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-around", margin: 2 }}>
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 300,
              }}
            >
              <DetailsItem discr="Current temp:" value={`${data?.temp}${deg}`} />
              <DetailsItem discr="Min temp:" value={`${data?.tempMin}${deg}`} />
              <DetailsItem discr="Max temp:" value={`${data?.tempMax}${deg}`} />
              <DetailsItem discr="Feels like:" value={`${data?.feelsLike}${deg}`} />
              <DetailsItem
                discr="Pressure:"
                value={`${
                  units === "metric" ? Math.round((data?.pressure ?? 1) * 0.75) : data?.pressure
                }${press}`}
              />
              <DetailsItem discr="Humidity:" value={`${data?.humidity}%`} />
              <DetailsItem discr="Wind:" value={`${data?.windSpeed}${speed}`} />
              <DetailsItem discr="Sunrise:" value={`${data?.sunrise}`} />
              <DetailsItem discr="Sunset:" value={`${data?.sunset}`} />
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component="h3"
                variant="button"
                align="center"
                sx={{ fontSize: "1.5rem" }}
                letterSpacing={5}
              >
                {data?.name},{data?.country}
              </Typography>
              <Typography align="center">
                <Box component="img" alt="Weather icon" src={data?.icon} />
              </Typography>
              <Typography component="h3" variant="button" align="center">
                {data?.detailsWeather}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ padding: 1, height: "200px", width: "100%" }}>
            <ChartApp hourly={hourly} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DetailsPage;
