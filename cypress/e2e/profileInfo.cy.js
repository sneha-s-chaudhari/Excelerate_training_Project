//Profile Information

describe('Update Profile Information', ()=>
{
    it('Profile Update', ()=>
    {
        cy.visit('https://dev.4excelerate.net/auth/login')

        //checking login page UI elements
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
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

        //Profile Information
        cy.get('#DOB').type('1995-05-23')
        cy.get('#select_gender').select('Female').should('have.value', 'Female')
        cy.get('input[placeholder="Phone"]').type('8866229441').should('be.visible')
        cy.get('#validateEmail').type('snehasubhashchaudhari@gmail.com')
        cy.get('#validateAddressLine1').type('D 601, Bhama Pearl Pune')
        cy.get('#validateCity').type('Pune')
        cy.get('#validateState').type('Maharashtra')
        //cy.get('#validateCountry').type('Ind')

        /*cy.get('#mat-option-242').each(($e1, index, $list) => 
        {
            if($e1.text==='India')
            {
                cy.wrap($e1).click()
            }
        })*/

        //autocomplete Validate
        cy.get('#validateCountry').should('have.value',"India")
        cy.get('#validateZipCode').type('390024')
        cy.get('button[type="submit"]').click()

    })
})