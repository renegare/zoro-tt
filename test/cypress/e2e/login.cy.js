const clientURL = 'http://localhost:3000/login';

describe('template spec', () => {
  it('passes', () => {
    cy.visit(clientURL);
    cy.get('[name=email]').type('username');
    cy.get('[name=password]').type('password');
    cy.get('button').click();
  })
})