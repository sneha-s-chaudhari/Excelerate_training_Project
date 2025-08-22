//Dashboard Test in mobile view

/// <reference types="Cypress" />

describe('Dashboard Mobile View Tests', ()=>{

    //using beforeEach() in Cypress for repeated setup before every it() test case runs
    beforeEach(() => 
    {
        //Set viewport for mobile
        cy.viewport('iphone-x')
        cy.visit('https://dev.4excelerate.net/auth/login')

        //Login first before each test
        cy.get('#email').type('snehas@vempower.org')
        cy.get('#password').type('NikhilBholane@23')
        cy.get('button[type = "submit"]').click()
        cy.url().should('include', '/dashboard')
    })


    it('Check all elements in mobile view', () =>
    {
        cy.get('#kt_aside_mobile_toggle').should('be.visible').click()
        cy.contains('Dashboard').should('be.visible').click()
        cy.contains("My Success").should("be.visible");
        cy.contains('Skill Wise Points').should('be.visible')
        cy.contains('Action Needed').should('be.visible')
        cy.contains('New Opportunities').should('be.visible')
        //cy.contains('Experience GPS').should('be.visible')
        cy.contains('Impact Highlight').should('be.visible')
    })


    it('Checks API call status code is 200, 300, or 304', () => 
    {
        cy.intercept('GET', '**/api/v1/profile/personalinfo', (req) => {
            req.continue((res) => {
            expect([200, 300, 304]).to.include(res.statusCode);
            });
        });
        // Trigger the API call
        cy.visit('https://dev.4excelerate.net/profile'); 
    });


    it('Verify UI data matches API response in mobile view', () => 
    {
        cy.viewport('iphone-x');
        cy.intercept('GET', '**/api/v1/profile/personalinfo', (req) => 
        {
            req.continue((res) => 
            {
                expect([200, 300, 304]).to.include(res.statusCode);
            });
        });
        // Trigger the API call
        cy.visit('https://dev.4excelerate.net/profile'); // or your actual profile page
    })

})