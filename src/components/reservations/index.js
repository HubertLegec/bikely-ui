import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import BikeTable from "./BikeTable";
import Filters from "./Filters";
import DateFnsAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
// import BikeProvider, { BikeContext } from "./BikeContext";

const Reservations = () => {
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bikeType, setBikeType] = useState("");
  const [isElectric, setIsElectric] = useState("");
  const [frameSize, setframeSize] = useState("");
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [rentFrom, setRentFrom] = useState("");
  // const [rentTo, setRentTo] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetch("http://localhost:8080/bikes").then((res) =>
        res.json()
      );

      console.log(data);
      setBikes(data);
    };
    fetchItems();
    setIsLoading(false);
  }, []);

  const handleBikeTypeChange = (event) => {
    setBikeType(event.target.value);
  };

  const handleIsElectricSwitchChange = (event) => {
    setIsElectric(event.target.checked);
  };

  const handleFrameSizeChange = (event) => {
    console.log(event.target.value);
    setframeSize(event.target.value);
  };

  const handlePickupLocationChange = (event) => {
    setRentFrom(event.target.value);
  };

  function search(bikes) {
    const filter = {
      type: bikeType,
      isElectric: isElectric,
      frameSize: frameSize,
      location: rentFrom
    };

    return bikes.filter((bike) => {
      console.log(bike.rentalPoint.location)

      for (let key in filter) {
        if (bike[key] !== filter[key] && filter[key] !== "") {
          return false;
        }
      }
      return true;
    });
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <Filters
              bikes={bikes}
              bikeType={bikeType}
              onBikeTypeChange={handleBikeTypeChange}
              isElectric={isElectric}
              onIsElectricSwitchChange={handleIsElectricSwitchChange}
              frameSize={frameSize}
              onFrameSizeChange={handleFrameSizeChange}
              rentFrom={rentFrom}
              onPickupLocationChange={handlePickupLocationChange}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={9}>
          <BikeTable
            bikes={search(bikes)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reservations;