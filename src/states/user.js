export class User {
  _accessToken;
  _profile;
  loggedInState;
  currentState;
  observers = [];

  constructor() {
    this.loggedInState = new LoggedInState(this);
    this.unauthenticatedState = new UnauthenticatedState(this);

    if (this.accessToken) this.currentState = this.loggedInState;
    this.currentState = this.unauthenticatedState;
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer();
    }
  }

  removeObserver(observer) {
    const observerIndex = this.observers.indexOf(observer);
    this.observers.splice(observerIndex, 1);
  }

  set state(state) {
    this.currentState = state;
  }

  get state() {
    return this.currentState;
  }

  set accessToken(accessToken) {
    if (!accessToken) this.handleError('Access token was not passed');
    this._accessToken = accessToken;
    localStorage.setItem('access_token', accessToken);
  }

  get accessToken() {
    if (this._accessToken) return this._accessToken;

    return localStorage.getItem('access_token');
  }

  set profile(profile) {
    if (!profile) this.handleError('Profile was not passed');
    this._profile = profile;
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  get profile() {
    if (this._profile) return this._profile;
    const profileFromLocalStorage = localStorage.getItem('profile');
    if (profileFromLocalStorage) return JSON.parse(profileFromLocalStorage);

    return null;
  }

  handleError(error) {
    console.log(error);
  }

  clearUserInformation() {
    this._accessToken = '';
    this._profile = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
  }

  isAuthenticated() {
    return this.state instanceof LoggedInState;
  }
}

class LoggedInState {
  user;

  constructor(user) {
    this.user = user;
  }

  logout() {
    this.user.clearUserInformation();
    this.user.state = this.user.unauthenticatedState;
    this.user.notifyObservers();
  }

  login() {
    this.user.handleError('User has already logged in');
  }
}

class UnauthenticatedState {
  user;

  constructor(user) {
    this.user = user;
  }

  logout() {
    this.user.handleError('User is not logged in');
  }

  login(accessToken, profile) {
    this.user.profile = profile;
    this.user.accessToken = accessToken;
    this.user.state = this.user.loggedInState;
    this.user.notifyObservers();
  }
}

export const userState = new User();
