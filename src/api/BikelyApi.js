export class BikelyApi {
  static apiUrl = "https://coderscamp-bikely.herokuapp.com";

  static set accessToken(access_token) {
    localStorage.setItem("access_token", access_token);
  }

  static get accessToken() {
    return localStorage.getItem("access_token");
  }

  static async login(values) {
    const response = await fetch(BikelyApi.apiUrl + "/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (!response.ok) result.error = true;
    else BikelyApi.accessToken = result.access_token;
    return result;
  }

  static async register(values) {
    const response = await fetch(BikelyApi.apiUrl + "/auth/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (!response.ok) result.error = true;
    return result;
  }

  static userHasAuthenticated() {
    return !!BikelyApi.accessToken;
  }
}
