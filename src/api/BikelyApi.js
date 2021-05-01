export class BikelyApi {
  static apiUrl = 'https://coderscamp-bikely.herokuapp.com';

  static async fetchProfile(accessToken = '') {
    try {
      const response = await fetch(BikelyApi.apiUrl + '/users/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Credentials': true,
        },
      });
      const result = await response.json();

      if (!response.ok) result.error = true;

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
      const loginBody = await response.json();
      const profile = await BikelyApi.fetchProfile(loginBody.access_token);

      if (!response.ok) loginBody.error = true;
      if (!profile.ok) loginBody.error = true;

      return { accessToken: loginBody.access_token, profile };
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

  static async getUserBasedReservations(profile, accessToken) {
    const response = await fetch(
      `${BikelyApi.apiUrl}/reservations/${profile.role === 'User' ? 'users' : 'rental_points/' + profile.rentalPoint}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return await response.json();
  }

  static async getBikes(startDate, accessToken) {
    const date = Date.parse(startDate);

    return await fetch(`${BikelyApi.apiUrl}/bikes?reservationDate=${date}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Credentials': true,
      },
    }).then((res) => res.json());
  }

  static async postReservation(reservation, accessToken) {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(reservation),
    });

    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getReservations(accessToken) {
    try {
      const response = await fetch(`${BikelyApi.apiUrl}/reservations`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result);

      return result;
    } catch (error) {
      BikelyApi.handleError(error);
    }
  }

  static async getPresentRents(accessToken) {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations/rents/present`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async getRentalPoints(accessToken) {
    const response = await fetch(`${BikelyApi.apiUrl}/rentalpoints`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async confirmRent(reservationId, accessToken) {
    const response = await fetch(`${BikelyApi.apiUrl}/reservations/rent/${reservationId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static async returnBike(rentalPointTo_id, reservationId, accessToken) {
    const response = await fetch(
      `${BikelyApi.apiUrl}/reservations/return/${reservationId}?rentalpoint_id=${rentalPointTo_id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const result = await response.json();
    if (!response.ok) result.error = true;

    return result;
  }

  static handleError(error) {
    console.log(error);
  }
}
