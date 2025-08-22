//Opportunity Test

describe('Opportunity Provider', () => 
{
    it('Test of Opportunity Provider', () => 
    {
        cy.visit('https://dev.4excelerate.net/auth/login')

        //checking login page UI elements
        cy.get('#email').should('be.visible')
        
        cy.get('#password').should('be.visible')
        cy.get('button[type = "submit"]').should('be.visible')

        //enter credentials
        cy.get('#email').type('snehas@vempower.org')
        cy.get('#password').type('NikhilBholane@23')
        cy.get('button[type = "submit"]').click()

        //verify dashboard loaded or not
        cy.url({ timeout: 10000 }).should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
        cy.get('.btn > .d-flex').click()
        cy.wait(10000)

        cy.intercept('GET', '**/api/v1/profile/personalinfo').as('personalInfo')
        cy.visit('https://dev.4excelerate.net/user-profile/opportunity-provider')
        cy.get(':nth-child(3) > .focus > .navi-text').click()

        cy.get('input[type="checkbox"]').uncheck().should('not.be.checked')
        cy.get('#sponsor-0').check().should('be.checked')

        cy.get('button[type="submit"]').click()

        cy.wait('@personalInfo').then(({ response }) => 
        {
            expect(response.statusCode).to.eq(200)   
            expect(response.body).to.have.property('data')  
        })
    })
})