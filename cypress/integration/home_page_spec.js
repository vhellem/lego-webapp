describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.server();
        cy.route('http://127.0.0.1:8000/api/v1/frontpage/', 'fixture:frontpage.json').as('getFrontpage');

        cy.visit('/');
        cy.wait('@getFrontpage');

        cy.contains('Bedpres og Kurs').parent('div').as('bedpres');
        cy.get('@bedpres').should('contain', 'KiD');
        cy.get('@bedpres').should('contain', 'DnB');
        cy.get('@bedpres').should('contain', 'Funksjonell');
        cy.get('@bedpres').should('not.contain', 'Funksjonell programmering i Javascript med React og Redux  3 av 3');
        cy.get('@bedpres').should('contain', 'Webutvikling101');
        cy.get('@bedpres').should('contain', 'Lego Mindstorms');

        cy.get('@bedpres').parent().contains('Arrangementer').parent('div').as('arr');
        cy.get('@arr').should('contain', 'Casino Royale');
        cy.get('@arr').should('contain', 'Infomøte for faddere');
        cy.get('@arr').should('contain', 'Fiesta!');
        cy.get('@arr').should('contain', 'BEKK');
        cy.get('@arr').should('contain', 'Vaargalla');
    });
});
