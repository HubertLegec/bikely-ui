import React from 'react';
import { MenuItem } from '@material-ui/core';

export const setRentalPointLocationPickListElement = (rentalPoint) => {
  return <MenuItem value={rentalPoint.id}>{rentalPoint.location}</MenuItem>;
};
