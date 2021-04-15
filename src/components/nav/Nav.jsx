// import React, { useState } from 'react';
// import { AppBar, Tab, Tabs } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';

// import { navTabs } from './Nav.constants';

// export const Nav = () => {
//   const history = useHistory();
//   const [tabValue, setTabValue] = useState(navTabs[0].value);

//   const handleChange = (event, newValue) => {
//     const route = navTabs.filter((item) => item.value === newValue)[0].route;
//     history.replace(route);
//     setTabValue(() => newValue);
//   };

//   return (
//     <AppBar position="sticky">
//       <Tabs
//         value={tabValue}
//         indicatorColor="secondary"
//         textColor="secondary"
//         onChange={handleChange}
//         aria-label="disabled tabs example"
//       >
//         {navTabs.map(({ value, label }, index) => (
//           <Tab value={value} label={label} key={index} />
//         ))}
//       </Tabs>
//     </AppBar>
//   );
// };

import React, { useState, useEffect } from 'react';

import { BikelyApi } from '../../api/BikelyApi';

import { Basic } from './Basic';
import { User } from './User';
import { Admin } from './Admin';

export const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState({});

  function handleUserChange() {
    const profile = BikelyApi.profile;

    setIsAuthenticated(BikelyApi.userHasAuthenticated());
    profile ? setUserRole(profile.role) : setUserRole({});
  }

  useEffect(() => {
    BikelyApi.registerObserver(handleUserChange);
    setIsAuthenticated(BikelyApi.userHasAuthenticated());
    if (BikelyApi.profile) setUserRole(BikelyApi.profile.role);

    return () => {
      BikelyApi.removeObserver(handleUserChange);
    };
  }, []);

  function getProperNavbar() {
    if (isAuthenticated) {
      return userRole === 'User' ? <User /> : <Admin />;
    }

    return <Basic />;
  }

  return getProperNavbar();
};
