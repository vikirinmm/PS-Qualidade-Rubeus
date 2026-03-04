Cypress.on('uncaught:exception', (err) => {
  // Ignora o erro específico da aplicação para não quebrar o teste
  if (err.message.includes('ActionsForm is not defined')) {
    return false
  }
})
describe('Página Certificação', () => {
  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/certificacao');
  });
  it('deve acessar a página de certificação', () => {
    cy.preencher_inscricao('Vinicius', '22 2222-2220', 'vinicius@gmail.com');
    cy.get('[name="rbFormEtapa1"] > [name="rbActionsFormContainer"] > [name="rbBtnNext"]').click()
    cy.get('.toast').should('be.visible');

  })
  it('não deve permitir avançar com nome vazio', () => {
  cy.get('[name="pessoa.telefonePrincipal"]').type('22 2222-2220')
  cy.get('[name="pessoa.emailPrincipal"]').type('vinicius@gmail.com')
  cy.get('[name="rbFormEtapa1"] > [name="rbActionsFormContainer"] > [name="rbBtnNext"]').click()
  cy.get('.toast').should('be.visible')
  })
  it('não deve aceitar letras no telefone', () => {
  cy.preencher_inscricao('Vinicius', '22 2222-2220aa', 'vinicius@gmail.com');
  cy.get('[name="rbFormEtapa1"] > [name="rbActionsFormContainer"] > [name="rbBtnNext"]').click()
  cy.get('.toast').should('be.visible')
})
it('não deve aceitar telefone apenas com espaços', () => {
  cy.preencher_inscricao('Vinicius', '22 2222-2220                           ', 'vinicius@gmail.com');
  cy.get('[name="rbFormEtapa1"] > [name="rbActionsFormContainer"] > [name="rbBtnNext"]').click({ force: true })
  cy.get('.toast').should('be.visible')
})
it('não deve aceitar caracteres especiais no nome', () => {
  cy.preencher_inscricao('Vinicius#', '22 2222-2220', 'vinicius@gmail.com');
  cy.get('[name="rbFormEtapa1"] > [name="rbActionsFormContainer"] > [name="rbBtnNext"]').click({ force: true })
  cy.get('.toast').should('be.visible')
})
})