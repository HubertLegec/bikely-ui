export class BikelyApi {
  static apiUrl = "https://coderscamp-bikely";
  static _accessToken = "";

  static set accessToken(accessToken) {
    localStorage.setItem("access_token", accessToken);
    BikelyApi._accessToken = accessToken;
  }

  static get accessToken() {
    return BikelyApi._accessToken ? BikelyApi._accessToken : localStorage.getItem("access_token");
  }

  static async login(values) {
    try {
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
    } catch (error) {
      BikelyApi.handleError(error);
    }
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

  static handleError(error) {
    console.log(error);
  }
}
