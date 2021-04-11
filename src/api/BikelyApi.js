export class BikelyApi {
  static apiUrl = 'http://localhost:8080';
  static _accessToken = '';
  static _profile;

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
    console.log('profile: ', BikelyApi._profile);
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

  static set profile(profile) {
    BikelyApi._profile = profile;
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  static async fetchProfile() {
    try {
      const response = await fetch(BikelyApi.apiUrl + '/users/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          //prettier-ignore
          'Authorization': `Bearer ${BikelyApi.accessToken}`,
        },
      });
      console.log(response);
      const result = await response.json();
      if (!response.ok) result.error = true;
      console.log('userProfile fetch result: ', result);
      BikelyApi.profile = result;

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
    BikelyApi.profile = undefined;
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

  static async getReservations(options = { userId: false, rentalPoint: [] }) {
    console.log(options);
    const response = await fetch(
      `${BikelyApi.apiUrl}/reservations/${
        options.userId ? 'users/' + (await BikelyApi.getProfile()).id : 'rentalPoints/' + options.rentalPoint
      }`,
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
