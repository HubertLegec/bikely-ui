import { format, parseISO } from 'date-fns';

export const convertToReservationRecords = (reservations, rentalPoints) => {
  if (!reservations) return [];
  const response = [];

  reservations.forEach((reservation) => {
    const rentalPointBikes = rentalPoints.find((e) => e._id === reservation.rentalPointFrom_id).bicycle_id;
    const reservationId = reservation.id;
    const userEmail = reservation.user_id.email;
    const bikeId = reservation.bike_id;
    const onStock = rentalPointBikes.includes(reservation.bike_id) ? 'Yes' : 'No';
    const plannedDateFrom = format(parseISO(reservation.plannedDateFrom), 'dd MMM yyyy hh:mm');
    const parsedReservationDate = Date.parse(plannedDateFrom.toString().substring(0, 11));
    const plannedDateTo = format(parseISO(reservation.plannedDateTo), 'dd MMM yyyy hh:mm');
    const rentFromLocationId = reservation.rentalPointFrom_id;
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
      rentFromLocationId: rentFromLocationId,
      rentFromLocation: rentFromLocation,
      returnLocation: returnLocation,
    };
    response.push(reservationRecord);
  });

  return response;
};

export const generatePicklistData = (rentalPoints, reservationRecords) => {
  if (!rentalPoints || !reservationRecords) return '';
  const points = rentalPoints.map((point) => {
    return { id: point._id, location: point.location };
  });
  const userEmails = new Set(
    reservationRecords.map((record) => {
      return record.userEmail;
    }),
  );

  return { points, userEmails };
};
