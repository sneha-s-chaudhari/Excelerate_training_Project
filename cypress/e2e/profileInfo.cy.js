    //Profile Information

    describe('Update Profile Information', ()=>
    {
        //variable to store fixture data(valid user credentials)
        let validUser;

        // This runs once before all tests in this describe block
        before(()=>
        {
            // Load fixture data from example.json
            cy.fixture('example').then((data) => 
            {
                validUser = data.validUser // Save validUser object for later use
            })
        })


        it('Profile Update', ()=>
        {
            // Visit the login page
            cy.visit('https://dev.4excelerate.net/auth/login')

            //enter credentials
            cy.get('#email').type(validUser.email)                 //type email from fixture
            cy.get('#password').type(validUser.password)           //type password from fixture 
            cy.get('button[type = "submit"]').click()              //click login

            //verify dashboard loaded or not
            cy.url({ timeout: 10000 }).should('include', '/dashboard')
            cy.contains('Dashboard').should('be.visible')
            cy.get('.btn > .d-flex').click()
            cy.wait(10000)                        // Wait a short time for profile section to load

            //Profile Information
            cy.get('#profile_avatar').selectFile('cypress/fixtures/sneha_chaudhari.jpg', { force: true })
            cy.get('#DOB').type('1995-05-23')
            cy.get('#select_gender').select('Female').should('have.value', 'Female')
            cy.get('input[placeholder="Phone"]').type('8866229441').should('be.visible')
            cy.get('#validateEmail').clear().type('snehasubhashchaudhari@gmail.com')
            cy.get('#validateAddressLine1').type('D 601, Bhama Pearl Pune')
            cy.get('#validateCity').type('Pune')
            cy.get('#validateState').type('Maharashtra')
            
            //autocomplete Validate
            cy.get('#validateCountry').should('have.value',"India")
            cy.get('#validateZipCode').type('390024')

            //Submitting the updated profile info
            cy.get('button[type="submit"]').click()

        })
    })