import React from 'react';
import { MenuItem } from '@material-ui/core';

export const setFrameSizePickListElement = (frameSize) => {
  return <MenuItem value={frameSize}>{frameSize}</MenuItem>;
};
