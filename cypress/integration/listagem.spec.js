/// <reference types="cypress" />

context('Listagem', () => {
    
    it('Listagem sem registro', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webTable-get-none'
        }).as('getNewTable');

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);
    });

    it('Listagem com apenas um registro', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webTable-get-unique'
        }).as('getNewTable');

        cy.visit('WebTable.html');

        cy.get('div[role=row] div[role=gridcell]')
          .eq(4)
          .find('div')
          .as('getGridCellPhone');

        cy.get('@getGridCellPhone').should('contain.text', '3129876543');
    });
});