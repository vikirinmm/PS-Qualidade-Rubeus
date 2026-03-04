// Helper: tenta achar input/textarea/select associado a um texto (label ou placeholder)
Cypress.Commands.add("fieldByText", (labelText) => {
  const text = new RegExp(labelText, "i");

  // 1) label clássico: <label for="id">Nome</label> <input id="id" />
  return cy.contains("label", text).then(($label) => {
    const forId = $label.attr("for");
    if (forId) {
      return cy.get(`#${CSS.escape(forId)}`);
    }

    // 2) input dentro do mesmo container do label
    const $container = $label.parent();
    const found = $container.find("input, textarea, select");

    if (found.length) {
      return cy.wrap(found.first());
    }

    // 3) fallback: procurar input perto (mesma seção)
    return cy
      .contains(text)
      .closest("div, section, form")
      .find("input, textarea, select")
      .first();
  });
});

// Helper: preencher campo por texto
Cypress.Commands.add("fillField", (labelText, value) => {
  cy.fieldByText(labelText)
    .should("be.visible")
    .clear({ force: true })
    .type(value, { delay: 0, force: true });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })