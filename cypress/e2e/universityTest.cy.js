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

    })

    it('should return status 200 OK', () => {
        cy.request({
            url: 'https://www.youtube-nocookie.com/s/player/5ec65609/www-embed-player.vflset/www-embed-player.js',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('should return status 300 Multiple Choices (if applicable)', () => {
        cy.request({
        url: 'https://www.youtube-nocookie.com/s/player/5ec65609/www-embed-player.vflset/www-embed-player.js', 
        failOnStatusCode: false,
        }).then((response) => {
        expect(response.status).to.eq(300);
        });
    });
    it('should return HTTP 304 Not Modified when resource not changed', () => {
        cy.request
        ({
                method: 'GET',
                url: 'https://experience.4excelerate.org/assets/media/logos/excelerate_spinner.gif',
                headers: 
                {
                    'If-None-Match': '"b20a0973b226eeea30362acb81f9e0b3"',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(304);
        });
    });

    
})