describe("Certificação - qualidade.apprbs.com.br/certificacao", () => {
  beforeEach(() => {
    cy.visit("/certificacao");
  });

  it("Smoke: página carrega e exibe o formulário (campos principais)", () => {
    // Ajuste os textos se no site estiver diferente (ex: 'E-mail' vs 'Email')
    cy.contains(/certifica/i).should("be.visible"); // título genérico
    cy.fieldByText("Nome").should("exist");
    cy.fieldByText("Telefone").should("exist");
    cy.fieldByText("E-mail").should("exist");

    // botão "Avançar" (se estiver como 'Próximo' ajuste)
    cy.contains("button", /avan(ç|c)ar|pr(ó|o)ximo|continuar/i).should("be.visible");
  });

  it("C-001: ao preencher e clicar em Avançar, exibe mensagem 'base legal' (bug crítico)", () => {
    cy.fillField("Nome", "Vinicius Lemes");
    cy.fillField("Telefone", "62999999999");
    cy.fillField("E-mail", "vinicius@gmail.com");

    cy.contains("button", /avan(ç|c)ar|pr(ó|o)ximo|continuar/i).click();

    // valida a mensagem (ajuste se o texto for um pouco diferente)
    cy.contains(/base legal/i).should("be.visible");

    // opcional: garante que não avançou para etapa 2 (se existir algum indicador 2/2)
    cy.contains(/1\s*\/\s*2/i).should("be.visible");
  });

  it("C-004: Nome vazio não mostra erro obrigatório (inconsistência de validação)", () => {
    // deixa nome vazio
    cy.fillField("Telefone", "62999999999");
    cy.fillField("E-mail", "vinicius@gmail.com");

    cy.contains("button", /avan(ç|c)ar|pr(ó|o)ximo|continuar/i).click();

    // O bug é: NÃO aparece erro embaixo do Nome.
    // Como a mensagem exata pode variar, testamos pela ausência de erro próximo do campo.
    // Se existir um texto padrão (ex: "Preencha este campo"), depois ajustamos para ficar 100% fiel.

    cy.fieldByText("Nome").then(($input) => {
      const $wrap = $input.closest("div");
      cy.wrap($wrap).should("not.contain.text", "Preencha");
      cy.wrap($wrap).should("not.contain.text", "obrigat");
      cy.wrap($wrap).should("not.contain.text", "inválid");
    });
  });

  it("C-006: Campo Nome aceita números (validação fraca)", () => {
    cy.fillField("Nome", "12345");
    // se tiver alguma validação imediata, ela deveria reclamar.
    // aqui a gente só prova que o campo aceita digitação numérica
    cy.fieldByText("Nome").should("have.value", "12345");
  });

  it("C-007: Campo Telefone aceita apenas espaços (deveria invalidar)", () => {
    cy.fillField("Telefone", "          "); // vários espaços
    cy.contains("button", /avan(ç|c)ar|pr(ó|o)ximo|continuar/i).click();

    // Esperado correto seria erro por telefone inválido/obrigatório.
    // Como você relatou inconsistência, aqui validamos que o sistema aponta algo no telefone
    // (ajuste o texto depois quando você me disser a mensagem exata).
    cy.fieldByText("Telefone").then(($input) => {
      const $wrap = $input.closest("div");
      cy.wrap($wrap).should("contain.text", "Preencha"); // ajuste se for diferente
    });
  });
});