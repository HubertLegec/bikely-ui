import { format, parseISO } from 'date-fns';

export const convertToRentRecords = (rents, rentalPoints) => {
  const response = [];

  rents.forEach((rent) => {
    const reservationId = rent.id;
    const userEmail = 'email';
    const bikeId = rent.bike_id;
    const actualDateFrom = format(parseISO(rent.actualDateFrom), 'dd MMM yyyy hh:mm');
    const plannedDateTo = format(parseISO(rent.plannedDateTo), 'dd MMM yyyy hh:mm');
    const returnLocation = rentalPoints.find((e) => e._id === rent.rentalPointTo_id).location;

    const rentRecord = {
      id: reservationId,
      userEmail: userEmail,
      bikeId: bikeId,
      actualDateFrom: actualDateFrom,
      plannedDateTo: plannedDateTo,
      returnLocation: returnLocation,
    };
    response.push(rentRecord);
  });

  return response;
};

export const generatePicklistData = (rentalPoints, rentRecords) => {
  const points = rentalPoints.map((point) => {
    return { id: point._id, location: point.location };
  });
  const bikeIds = rentRecords.map((rent) => {
    return rent.bikeId;
  });

  return { points, bikeIds };
};
