// Dashboard Test in mobile view
/// <reference types="Cypress" />

describe('Dashboard Mobile View Tests', () => {

    //let User

    // Runs before each test
    beforeEach(() => {
        cy.viewport('iphone-x')

        // Load fixture and login
        
        cy.fixture('example').then((data) => {
            
            let User = data.validUser

            cy.visit('https://dev.4excelerate.net/auth/login')

            cy.get('#email').should('be.visible').type(User.email)
            cy.get('#password').should('be.visible').type(User.password)
            cy.get('button[type="submit"]').should('be.visible').click()

            // Verify dashboard loaded
            cy.url().should('include', '/dashboard')
        })
    })

    // Verify dashboard elements in mobile view
    it('Check all elements in mobile view after login', () => {
        cy.get('#kt_aside_mobile_toggle').should('be.visible').click()
        cy.contains('Dashboard').should('be.visible').click()
        cy.contains("My Success").should("be.visible")
        cy.contains('Skill Wise Points').should('be.visible')
        cy.contains('Action Needed').should('be.visible')
        cy.contains('New Opportunities').should('be.visible')
        cy.contains('Impact Highlight').should('be.visible')
    })

    // 304 Not Modified API test
    it('should intercept personalinfo API and verify status 304', () => {
        cy.intercept('GET', 'https://dev.4excelerate.net:8081/api/v1/profile/personalinfo', {
            statusCode: 304
        }).as('personalinfo')

        // Force network request (avoid cache)
        cy.visit('https://dev.4excelerate.net/dashboard?cb=' + Date.now())

        cy.wait('@personalinfo', { timeout: 20000 }).then(({ response }) => {
            expect(response.statusCode).to.eq(304)
        })
    })

    // 200 OK API test
    it('should intercept impactHighlight API and ensure status 200', () => {
        cy.intercept('GET', '**/api/v1/dashboard/impactHighlight').as('dashboard')

        // Visit dashboard after intercept
        cy.visit('https://dev.4excelerate.net/dashboard')

        cy.wait('@dashboard', { timeout: 20000 }).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    // 300 Multiple Choices API test
    it('should mock impactHighlight API with status 300', () => {
        cy.intercept('GET', '**/api/v1/dashboard/impactHighlight', {
            statusCode: 300,
            body: {
                message: "Multiple Choices (mocked)"
            }
        }).as('dashboardMock')

        cy.visit('https://dev.4excelerate.net/dashboard')

        cy.wait('@dashboardMock').then(({ response }) => {
            expect(response.statusCode).to.eq(300)
            expect(response.body.message).to.eq("Multiple Choices (mocked)")
        })
    })

})
