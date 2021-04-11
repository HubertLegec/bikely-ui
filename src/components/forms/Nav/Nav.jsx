import React, { useState } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { navTabs } from './LoginForm.constants';

export const Nav = () => {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(navTabs[0].value);

  const handleChange = (event, newValue) => {
    const route = navTabs.filter((item) => item.value === newValue)[0].route;
    history.replace(route);
    setTabValue(() => newValue);
  };

  return (
    <AppBar position="sticky">
      <Tabs
        value={tabValue}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        {navTabs.map(({ value, label }, index) => (
          <Tab value={value} label={label} key={index} />
        ))}
      </Tabs>
    </AppBar>
  );
};
