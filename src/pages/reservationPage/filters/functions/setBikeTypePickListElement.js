import React from 'react';
import { MenuItem } from '@material-ui/core';

export const setBikeTypePickListElement = (type) => {
  return <MenuItem value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>;
};
