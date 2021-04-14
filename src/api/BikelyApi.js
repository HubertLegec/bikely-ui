export class BikelyApi {
  static apiUrl = 'https://coderscamp-bikely.herokuapp.com';
  static _accessToken = '';

  static set accessToken(accessToken) {
    localStorage.setItem('access_token', accessToken);
    BikelyApi._accessToken = accessToken;
  }

  static get accessToken() {
    return BikelyApi._accessToken ? BikelyApi._accessToken : localStorage.getItem('access_token');
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

      return result;
    } catch (error) {
      BikelyApi.handleError(error);
    }
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

  static userHasAuthenticated() {
    return !!BikelyApi.accessToken;
  }

  static handleError(error) {
    console.log(error);
  }
}
