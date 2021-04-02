describe("Home", () => {
  describe("Navbar changes sub pages", () => {
    it("Should change page to login", () => {
      cy.visit("/");
      cy.get("a[href='/login']").click();
      cy.location("pathname").should("eq", "/login");
      cy.get("form.login");
    });

    it("Should change page to register", () => {
      cy.get("a[href='/register']").click();
      cy.location("pathname").should("eq", "/register");
      cy.get("form.register");
    });
  });
});
