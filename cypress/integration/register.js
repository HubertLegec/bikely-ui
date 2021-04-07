import { BikelyApi } from "../../src/api/BikelyApi";

let correctInput,
  loginResponses = [],
  registerResponses = [];

before(() => {
  cy.visit("/register");

  cy.fixture("loginResponses").then(responsesObject => {
    registerResponses = [responsesObject.unauthorized, responsesObject.correct, responsesObject.correct];
  });
  cy.fixture("registerResponses").then(responsesObject => {
    loginResponses = [responsesObject.badRequest, responsesObject.correct];
  });
  cy.fixture("registerInputValues").then(inputs => {
    correctInput = inputs.correct;
  });
});

beforeEach(() => {
  cy.get("#email").type(correctInput.email);
  cy.get("#username").type(correctInput.username);
  cy.get("#password").type(correctInput.password);

  cy.intercept(BikelyApi.apiUrl + "/auth/login", req => req.reply(loginResponses.shift()));
  cy.intercept(BikelyApi.apiUrl + "/auth/register", req => req.reply(registerResponses.shift()));
});

afterEach(() => {
  cy.reload();
});

describe("register", () => {
  it("Should display error message after unsuccessful register", () => {
    cy.get("button[type='submit']").trigger("mouseover").click();
    cy.get("#formError").should("have.text", "Something went wrong");
  });

  it("Should display error after unsuccessful login", () => {
    cy.get("button[type='submit']").trigger("mouseover").click();
    cy.get("#formError").should("have.text", "Something went wrong");
  });

  it("Should register, login and redirect", () => {
    cy.get("button[type='submit']").trigger("mouseover").click();
    cy.location("pathname")
      .should("not.equal", "/register")
      .then(() => {
        expect(BikelyApi.userHasAuthenticated()).to.be.true;
      });
  });
});
