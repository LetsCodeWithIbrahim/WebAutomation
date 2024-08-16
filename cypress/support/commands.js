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
import 'cypress-drag-drop';

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

    cy.url({ timeout: 100000 }).should('include', '/admin/shipments?page=1');
});

Cypress.Commands.add('getCurrentDateTimeInMST', (offsetHours = 0) => {
    const now = new Date();
    
    // Add the offset in hours to the current time
    now.setHours(now.getHours() + offsetHours);
  
    // Define the time zone for MST
    const optionsDate = {
      timeZone: 'America/Denver', // MST time zone
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
  
    const optionsTime = {
      timeZone: 'America/Denver',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // 24-hour format
    };
  
    // Get date and time in MST
    const formatterDate = new Intl.DateTimeFormat('en-US', optionsDate);
    const formatterTime = new Intl.DateTimeFormat('en-US', optionsTime);
    
    const dateTimeInMST = {
      date: formatterDate.format(now),
      time: formatterTime.format(now)
    };
  
    // Format date and time as needed
    const [month, day, year] = dateTimeInMST.date.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = dateTimeInMST.time; // Time in 24-hour format
  
    return { formattedDate, formattedTime };
  });