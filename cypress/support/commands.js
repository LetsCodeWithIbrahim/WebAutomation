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

Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('URL'), { failOnStatusCode: false });

    console.log('Logging in with:', email);

    cy.get('#email', { timeout: 10000 }).should('be.visible').type(email);

    // Type password after #email is typed
    cy.get('#password').should('be.visible').type(password);

    // Click login button after #password is typed
    cy.get('.button--primary').should('be.visible').click();

    cy.url().then(url => {
        console.log('Current URL after login:', url);
    });

    cy.url({ timeout: 50000 }).should('include', '/admin/shipments?page=1');
});