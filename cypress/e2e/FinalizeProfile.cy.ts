describe('Finalize Profile tests', () => {
  beforeEach(() => {
    cy.login('test@gmail.com', '123456');

    cy.visit('/register-profile');
  });
  it('should fill out the form and submit', () => {
    cy.get('#birth-date').type('25062002');
    cy.get('#phone').type('85999999999');
    cy.get('#status-civil').select('Solteiro (a)');
    cy.get('#cep').type('123456');
    cy.get('#logradouro').type('123456');
    cy.get('#number').type('123456');
    cy.get('#bairro').type('123456');
    cy.get('#file').selectFile({
      contents: Cypress.Buffer.from('file contents...'),
      fileName: 'file.txt',
      mimeType: 'text/plain',
      lastModified: Date.now(),
    });

    cy.get('form').submit();
    cy.contains('Perfil criado com sucesso');
  });
});
