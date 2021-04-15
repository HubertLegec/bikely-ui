export class BikelyApi {
  static apiUrl = 'https://coderscamp-bikely.herokuapp.com';
  static _accessToken = '';
  static _profile;
  static observers = [];

  static registerObserver(observer) {
    BikelyApi.observers.push(observer);
  }
  static notifyObservers() {
    for (const observer of BikelyApi.observers) {
      observer();
    }
  }
  static removeObserver(observer) {
    const observerIndex = BikelyApi.observers.indexOf(observer);
    BikelyApi.observers.splice(observerIndex, 1);
  }

  static set accessToken(accessToken) {
    localStorage.setItem('access_token', accessToken);
    BikelyApi._accessToken = accessToken;
  }

  static get accessToken() {
    if (!BikelyApi._accessToken) {
      const accessTokenFromLocalStorage = localStorage.getItem('access_token');

      if (accessTokenFromLocalStorage) {
        BikelyApi._accessToken = accessTokenFromLocalStorage;

        return accessTokenFromLocalStorage;
      }

      return '';
    }

    return BikelyApi._accessToken;
  }

  static async getProfile() {
    if (BikelyApi._profile) return BikelyApi._profile;
    const profileFromLocalStorage = JSON.parse(localStorage.getItem('profile'));

    if (profileFromLocalStorage && Object.keys(profileFromLocalStorage).length > 0) {
      BikelyApi._profile = profileFromLocalStorage;

      return profileFromLocalStorage;
    }

    const profile = await BikelyApi.fetchProfile();
    if (profile.ok) return profile;
    BikelyApi.handleError();
  }

  static get profile() {
    if (BikelyApi._profile) return BikelyApi._profile;
    const profileFromLocalStorage = JSON.parse(localStorage.getItem('profile'));
    if (profileFromLocalStorage) {
      BikelyApi._profile = profileFromLocalStorage;

      return profileFromLocalStorage;
    }

    return null;
  }

  static set profile(profile) {
    BikelyApi._profile = profile;
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  static async fetchProfile() {
    try {
      const response = await fetch(BikelyApi.apiUrl + '/users/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          //prettier-ignore
          'Authorization': `Bearer ${BikelyApi.accessToken}`,
          'Access-Control-Allow-Credentials': true,
        },
      });

      const result = await response.json();

      if (!response.ok) result.error = true;

      BikelyApi.profile = result;
      BikelyApi.notifyObservers();

      return result;
    } catch (error) {
      BikelyApi.handleError(error);
    }
  }

  static async login(values) {
    try {
      const response = await fetch(BikelyApi.apiUrl + '/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) result.error = true;
      else BikelyApi.accessToken = result.access_token;

      BikelyApi.fetchProfile();

      return result;
    } catch (error) {
      BikelyApi.handleError(error);
    }
  }

  static logout() {
    BikelyApi.accessToken = '';
    BikelyApi.profile = '';
    BikelyApi.notifyObservers();
  }

  static async register(values) {
    const response = await fetch(BikelyApi.apiUrl + '/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getReservations() {
    const profile = await BikelyApi.getProfile();

    const response = await fetch(
      `${BikelyApi.apiUrl}/reservations/${profile.role === 'User' ? 'users' : 'rental_points/' + profile.rentalPoint}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          //prettier-ignore
          'Authorization': `Bearer ${BikelyApi.accessToken}`,
        },
      },
    );

    return await response.json();
  }

  static async getBikes(startDate) {
    const date = Date.parse(startDate);

    return await fetch(`${BikelyApi.apiUrl}/bikes?reservationDate=${date}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
        'Access-Control-Allow-Credentials': true,
      },
    }).then((res) => res.json());
  }

  static async postReservation(reservation) {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(reservation),
    });

    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getReservations() {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getPresentRents() {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations/rents/present`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getRentalPoints() {
    const response = await fetch(`${BikelyApi.apiUrl}/rentalpoints`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async confirmRent(reservationId) {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations/rent/${reservationId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async returnBike(rentalPointTo_id, reservationId) {
    const response = await fetch(
      `${BikelyApi.apiUrl}/reservations/return/${reservationId}?rentalpoint_id=${rentalPointTo_id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BikelyApi.accessToken}`,
        },
      },
    );
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static userHasAuthenticated() {
    return !!BikelyApi.accessToken;
  }

  static handleError(error) {
    console.log(error);
  }
}
