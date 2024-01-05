const clientURL = 'http://localhost:3000/login';

describe('template spec', () => {
  it('passes', () => {
    cy.visit(clientURL);
    cy.get('email').type('username');
    cy.get('password').type('password');
    cy.get('button').click();
  })
})