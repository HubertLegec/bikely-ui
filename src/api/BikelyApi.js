export class BikelyApi {
  // static apiUrl = 'http://localhost:8080';
  static apiUrl = 'https://coderscamp-bikely.herokuapp.com/';
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
    console.log(`${BikelyApi.apiUrl}/bikes?reservationDate=${date}`);
    const data = await fetch(`${BikelyApi.apiUrl}/bikes?reservationDate=${startDate}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BikelyApi.accessToken}`,
        'Access-Control-Allow-Credentials': true,
      },
    }).then((res) => res.json());

    return data;
  }

  static async postReservation(reservation) {
    console.log(BikelyApi.accessToken);
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
    console.log(result);
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
