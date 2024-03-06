describe('Register tests', () => {
  beforeEach(() => {
    cy.visit('/register');
  });
  it('should fill out the form and submit', () => {
    cy.get('#name').type('test');
    cy.get('#email').type('test@gmail.com');
    cy.get('#cpf').type('00000000000');
    cy.get('#password').type('123456');
    cy.get('form').submit();
  });
  it('It should return an error if the CPF already exists', () => {
    const cpfExisting = '00000000000';
    cy.intercept(
      { method: 'POST', url: '/users' },
      {
        body: { errors: ['Usuário já existente por CPF.'], status: 400 },
      },
    ).as('createUser');

    cy.get('#name').type('test name');
    cy.get('#email').type('test@gmail.com');
    cy.get('#cpf').type(cpfExisting);
    cy.get('#password').type('123456');
    cy.get('form').submit();

    cy.contains('Usuário já existente por CPF.');
  });
  it('It should return an error if the email already exists', () => {
    const emailExisting = 'test@gmail.com';
    cy.intercept(
      { method: 'POST', url: '/users' },
      {
        body: { errors: ['Usuário já existente por e-mail.'], status: 400 },
      },
    ).as('createUser');

    cy.get('#name').type('test name');
    cy.get('#email').type(emailExisting);
    cy.get('#cpf').type('00000000000');
    cy.get('#password').type('123456');
    cy.get('form').submit();

    cy.contains('Usuário já existente por e-mail.');
  });

  it('should return to /login when clicking the button', () => {
    cy.get('#btn-login').click();
    cy.url().should('include', '/login');
  });
});
