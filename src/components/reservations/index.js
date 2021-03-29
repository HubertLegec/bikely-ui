import React, { useState, useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import BikeTable from "./BikeTable";
import Filters from "./Filters";
import DateFnsAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import BikeProvider, { BikeContext } from "./BikeContext";

const Reservations = () => {
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bikeTypes, setBikeTypes] = useState([]);
  const [frameSizes, setFrameSizes] = useState([]);
  const [rentalPointLocations, setRentalPointLocations] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetch("http://localhost:8080/bikes").then((res) =>
        res.json()
      );
      console.log(data);
      setBikes(data);
      setFrameSizes(
        new Set(
          data.map((e) => {
            return e.frameSize;
          })
        )
      );
      setBikeTypes(
        new Set(
          data.map((e) => {
            return e.type;
          })
        )
      );
      setRentalPointLocations(
        new Set(
          data.map((e) => {
            return e.rentalPoint.location;
          })
        )
      );

    };
    fetchItems();
    setIsLoading(false);
  }, []);


  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>

            <Filters
              bikeTypes={bikeTypes}
              frameSizes={frameSizes}
              rentalPointLocations={rentalPointLocations}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={9}>
          <BikeTable bikes={bikes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reservations;