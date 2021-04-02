import { BikelyApi } from "../../src/api/BikelyApi";

let correctInput,
  responses = [];

before(() => {
  cy.visit("/login");

  cy.fixture("loginResponses").then(responsesObject => {
    responses = [responsesObject.unauthorized, responsesObject.correct];
  });
  cy.fixture("loginInputValues").then(requests => {
    correctInput = requests.correct;
  });
});

afterEach(() => {
  cy.reload();
});

beforeEach(() => {
  cy.get("#email").type(correctInput.email);
  cy.get("#password").type(correctInput.password);
  cy.intercept("POST", BikelyApi.apiUrl + "/auth/login", req => req.reply(responses.shift()));
});

describe("login", () => {
  it("Should display error message after unsuccessful login", () => {
    cy.get("button[type='submit']").trigger("mouseover").click();
    cy.get("#formError").should("have.text", "Invalid credentials");
  });

  it("Should login and redirect", () => {
    cy.get("button[type='submit']").trigger("mouseover").click();
    cy.location("pathname")
      .should("not.equal", "/login")
      .then(() => {
        expect(BikelyApi.userHasAuthenticated()).to.be.true;
      });
  });
});
