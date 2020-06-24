context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('nav a[href="/"]').as('navChat');
        cy.get('nav a[href="/preferences"]').as('navPreferences');
    })

    it('should send a message', () => {
        cy.get('input')
            .type('This is a testmessage')
            .should('have.value', 'This is a testmessage');
        cy.get('button')
            .click();
        cy.get('input')
            .should('have.value', '');
        cy.get('.bubble')
            .should('exist');
    });

    it('should route correctly and have the correct styling classes applied', () => {
        cy.get('@navChat').should("have.class", "active");
        cy.get('@navPreferences').should("not.have.class", "active");

        cy.get('@navPreferences').click();
        cy.get('@navChat').should("not.have.class", "active");
        cy.get('@navPreferences').should("have.class", "active");

        cy.get('@navChat').click();
        cy.get('@navChat').should("have.class", "active");
        cy.get('@navPreferences').should("not.have.class", "active");
    });

    it('should display the dark theme correctly', () => {
        cy.get('body')
            .should('have.css', 'background-color', 'rgb(255, 255, 255)');
        cy.get('@navPreferences').click();
        cy.get('#interface-color-options-dark').click();
        cy.get('@navChat').click();

        cy.get('body')
            .should('not.have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('should display the chat message time format correctly', () => {
        cy.get('input')
            .type('This is a testmessage')
            .should('have.value', 'This is a testmessage');
        cy.get('button')
            .click();
        cy.get('.bubble')
            .contains('div', /(AM|PM)/)
            .should('exist');

        cy.get('@navPreferences').click();
        cy.get('#clock-display-options-24h').click();
        cy.get('@navChat').click();

        cy.get('.bubble')
            .contains('div', /(AM|PM)/)
            .should('not.exist');
    });

    it('should send messages on ctrl+enter', () => {
        cy.get('input')
            .type('This is a testmessage')
            .type('{ctrl}{enter}')

        cy.get('.bubble').should('exist');

        cy.get('@navPreferences').click();
        cy.get('#messages-on-ctrl-enter-off').click();
        cy.get('@navChat').click();

        cy.get('input')
            .type('This is a testmessage')
            .type('{ctrl}{enter}')
            .should('have.value', 'This is a testmessage');
        cy.get('.bubble')
            .should('have.length', 1);
    });
})
