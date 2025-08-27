//Login and Logout Test
/// <reference types="Cypress" />

describe('Login & Logout Test', () => 
{
    // Variables to store fixture data for all test cases
    let validUser, invalidEmailUser, invalidPasswordUser

    // Load fixture data once before all tests in this block
    before(() => 
    {
        cy.fixture('example').then((data)=>
        {
            validUser = data.validUser                      // Valid login credentials
            invalidEmailUser = data.invalidEmailUser        // non-existent email scenario
            invalidPasswordUser = data.invalidPasswordUser  //invalid password scenario
        })

    })

    // Run before each test
    beforeEach(() =>
    {
        cy.visit('https://dev.4excelerate.net/auth/login')

         // Verify that login page elements are visible before interacting
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('button[type= "submit"]').should('be.visible')
    })

    // Positive Test: Valid Login
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

    // Negative Test: Wrong Password
    it('should NOT log in with wrong password', () => 
    {
        cy.fixture('example').then(({ invalidPasswordUser }) =>
        {
            cy.get('#email').type(invalidPasswordUser.email)
            cy.get('#password').type(invalidPasswordUser.password)
            
            cy.get('button[type="submit"]').should('be.disabled')
            cy.contains(' Please enter a valid password.').should('be.visible')
            cy.url().should('include', '/auth/login');
        })
    })

    // Negative Test: Non-existent Email
    it('should NOT log in with non-existent email', ()=>
    {
        cy.fixture('example').then(({ invalidEmailUser }) => 
        {
            cy.get('#email').type(invalidEmailUser.email)
            cy.get('#password').type(invalidEmailUser.password)
            
            cy.get('button[type="submit"]').should('be.disabled')
            cy.contains('Please enter a valid email').should('be.visible')
            cy.contains('Please enter a valid password.').should('be.visible')
            cy.url().should('include', '/auth/login')
        })
    })
})