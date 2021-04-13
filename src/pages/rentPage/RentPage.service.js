import { format, parseISO } from 'date-fns';

export const convertToReservationRecords = (reservations, rentalPoints) => {
  const response = [];

  reservations.forEach((reservation) => {
    const rentalPointBikes = rentalPoints.find((e) => e._id === reservation.rentalPointFrom_id).bicycle_id;
    const reservationId = reservation.id;
    const userEmail = 'email';
    const bikeId = reservation.bike_id;
    const onStock = rentalPointBikes.includes(reservation.bike_id) ? 'Yes' : 'No';
    const plannedDateFrom = format(parseISO(reservation.plannedDateFrom), 'dd MMM yyyy hh:mm');
    const parsedReservationDate = Date.parse(plannedDateFrom.toString().substring(0, 11));
    const plannedDateTo = format(parseISO(reservation.plannedDateTo), 'dd MMM yyyy hh:mm');
    const rentFromLocation = rentalPoints.find((e) => e._id === reservation.rentalPointFrom_id).location;
    const returnLocation = rentalPoints.find((e) => e._id === reservation.rentalPointTo_id).location;

    const reservationRecord = {
      id: reservationId,
      userEmail: userEmail,
      bikeId: bikeId,
      onStock: onStock,
      plannedDateFrom: plannedDateFrom,
      parsedReservationDate: parsedReservationDate,
      plannedDateTo: plannedDateTo,
      rentFromLocation: rentFromLocation,
      returnLocation: returnLocation,
    };
    response.push(reservationRecord);
  });

  return response;
};

export const generatePicklistData = (rentalPoints) => {
  const points = rentalPoints.map((point) => {
    return { id: point._id, location: point.location };
  });
  points.push('');
  const userEmails = 'email';

  return { points, userEmails };
};
