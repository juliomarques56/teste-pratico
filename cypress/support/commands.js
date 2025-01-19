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

Cypress.Commands.add("visitLoanPage", () => {
    cy.visit('/')
})

Cypress.Commands.add('validatePageContent', (selector, content) => {
    cy.get(selector).should('contain.text', content)
})

Cypress.Commands.add('clickElement', (selector) => {
    cy.get(selector).should('be.visible').click()
})

Cypress.Commands.add('customScreenshot', (description, resolution) => {
    cy.screenshot(`${description}_${resolution.width}x${resolution.height}`) 
})

Cypress.Commands.add('isVisible', (selector) => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add('typeText', (selector, text) => {
    cy.get(selector).should('be.visible').should('not.be.disabled').clear().type(text)
})

Cypress.Commands.add('validateErrorMessage', (selector, errorMessage) => {
    cy.get(selector).should('be.visible').and('contain.text', errorMessage)
})