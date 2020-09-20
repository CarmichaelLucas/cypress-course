/// <reference types="cypress" />


Given(/^que o site não possui registros$/, () => {

    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webTable-get-none'
    }).as('getNewTable');

});


When(/^acessar a listagem$/, () => {

    cy.visit('WebTable.html');

});


Then(/^devo visualizar a listagem vazia$/, () => {
    
    cy.get('div[role=row]').should('have.length', 1);

});


Given(/^que o site possui apenas um registro$/, () => {
    
    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webTable-get-unique'
    }).as('getNewTable');

});


Then(/^devo visualizar apenas um registro$/, () => {
    
    cy.get('div[role=row] div[role=gridcell]')
      .eq(4)
      .find('div')
      .as('getGridCellPhone');
    
    cy.get('@getGridCellPhone').should('contain.text', '3129876543');
});
