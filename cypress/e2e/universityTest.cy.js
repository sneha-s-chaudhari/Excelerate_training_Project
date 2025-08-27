describe('University Page Iframe & Content Test', () => 
{
    it('verifies UI content and YouTube iframe video (10s)', () => 
    {
        cy.visit('https://experience.4excelerate.org/external/Saint%20Louis%20University')
        
        cy.contains('Opportunities').should('be.visible')
        cy.contains('Opportunity Explorers ').should('be.visible')
        cy.contains('Country').should('be.visible')
        cy.contains('Scholarships').should('be.visible')

        cy.get('iframe').should('have.attr', 'src').and('include', 'https://www.youtube-nocookie.com/embed/KlecGuLkSNY');
        cy.wait(10000)
        cy.get('iframe[src*="youtube"]').should("be.visible");
    
    })

    it('should return status 200 OK', () => 
    {
        cy.request({
            url: 'https://www.youtube-nocookie.com/s/player/5ec65609/www-embed-player.vflset/www-embed-player.js',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })


    it('should return HTTP 304 Not Modified when page is cached', () => 
    {
        cy.intercept('GET', 'https://moderator.4excelerate.org:8081/api/v1/universityPage/organization/Saint%20Louis%20University', {
            statusCode: 304
        }).as('university')

        // Trigger page load
        cy.visit('https://experience.4excelerate.org/external/Saint%20Louis%20University?cb=')

        cy.wait('@university', { timeout: 20000 }).then(({ response }) => {
            expect(response.statusCode).to.eq(304)
        })
    })

    
})