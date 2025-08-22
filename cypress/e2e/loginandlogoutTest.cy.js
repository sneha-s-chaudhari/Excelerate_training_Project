//Login and Logout Test
/// <reference types="Cypress" />

describe('Login & Logout Test', () => {

    beforeEach(() =>
    {
        cy.visit('https://dev.4excelerate.net/auth/login')
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('button[type= "submit"]').should('be.visible')
    })

    it('should login with valid credentials and see dashboard elements', () => 
    {
        cy.fixture('example').then(({ validUser}) => 
        {
            cy.get('#email').type(validUser.email)
            cy.get('#password').type(validUser.password)
            cy.get('button[type = "submit"]').click()

            //verify the dashboard is visible
            cy.url().should('include', '/dashboard')
            cy.contains('Dashboard').should('be.visible')
            cy.get('.btn > .d-flex').click()
            cy.contains("button", "Sign out").click({ force: true });
        })
    })

    it('should NOT log in with wrong password', () => 
    {
        cy.fixture('example').then(({ invalidPasswordUser }) =>
        {
            cy.get('#email').type(invalidPasswordUser.email)
            cy.get('#password').type(invalidPasswordUser.password)
            cy.get('button[type = "submit"]').click()

            cy.contains(' Please enter a valid password.').should('be.visible')
            cy.url().should('include', '/auth/login');
        })
    })

    it('should NOT log in with non-existent email', ()=>
    {
        cy.fixture('example').then(({ invalidEmailUser }) => 
        {
            cy.get('#email').type(invalidEmailUser.email)
            cy.get('#password').type(invalidEmailUser.password)
            cy.get('button[type="submit"]').click()

            cy.contains('Please enter a valid email').should('be.visible')
            cy.contains('Please enter a valid password.').should('be.visible')
            cy.url().should('include', '/auth/login')
        })
    })
})