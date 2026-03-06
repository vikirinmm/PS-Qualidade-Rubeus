Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ActionsForm')) {
    return false
  }
})

describe('Página Site', () => {
  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/site')
  })

  it('S-001 - deve exibir texto placeholder Lorem Ipsum na página', () => {
    cy.contains(/Lorem ipsum/i).should('be.visible')
  })

  it('S-002 - deve exibir evento desatualizado de 2022', () => {
    cy.contains(/Vestibular 2022/i).should('be.visible')
  })

  it('S-008 - formulário aceita telefone com letras e só bloqueia em Base Legal', () => {
    cy.preencher_formulario('Teste', 'vinicius@gmail.com', '11111111111aa')
    cy.get('[name="rbBtnNext"]').click({ force: true })
    cy.contains(/base legal/i, { timeout: 10000 }).should('be.visible')
  })

  it('S-009 - exibe erro de Base Legal inexistente ao enviar formulário', () => {
    cy.preencher_formulario('Teste', 'vinicius@gmail.com', '11111111111')
    cy.get('[name="rbBtnNext"]').click({ force: true })
    cy.contains(/base legal/i, { timeout: 10000 }).should('be.visible')
  })

  it('S-010 - formulário aceita nome com caracteres especiais e só bloqueia em Base Legal', () => {
    cy.preencher_formulario('Teste#@#@#@', 'vinicius@gmail.com', '11111111111')
    cy.get('[name="rbBtnNext"]').click({ force: true })
    cy.contains(/base legal/i, { timeout: 10000 }).should('be.visible')
  })
})