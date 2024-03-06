describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should fill out the form and submit', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('123456');
    cy.get('form').submit();
    cy.contains('Usuário logado com sucesso!');
  });
  it('should return error if password has at least 6 characters', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('12');
    cy.get('form').submit();
  });
  it('should return an error if the email type is invalid', () => {
    cy.get('#email').type('testgmail.com');
    cy.get('#password').type('123456');
    cy.get('form').submit();
  });
  it('should return an error if credentials are invalid', () => {
    cy.intercept(
      { method: 'POST', url: '/auth' },
      {
        body: { errors: ['Crendenciais inválidas.'], status: 400 },
      },
    ).as('login');

    cy.get('#email').type('testgmail.com');
    cy.get('#password').type('123456');
    cy.get('form').submit();
    cy.contains('Crendenciais inválidas.');
  });
  it('should return to /register when clicking the button', () => {
    cy.get('#btn-register').click();
    cy.url().should('include', '/register');
  });
});
