const clientURL = 'http://localhost:3000';

describe('template spec', () => {
  it('happy path', () => {
    cy.visit(`${clientURL}/login`);

    cy.contains('Login').should('be.visible');
    cy.get('[name=email]').type('username');
    cy.get('[name=password]').type('password');
    cy.get('button').click();

    cy.contains('Logged In').should('be.visible');
  });

  it('should redirect to login page if no auth', () => {
    cy.visit(`${clientURL}/loggedin`);
    cy.url().should('eq', `${clientURL}/login`);
  });
});
