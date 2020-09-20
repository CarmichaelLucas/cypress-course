/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        cy.visit('Register.html');

        // Conceito de Rotas
        // GET 200 /api/1/databases/userdetails/collections/newtable?
        // POST 200 /api/1/databases/userdetails/collections/newtable?
        // POST 200 /api/1/databases/userdetails/collections/usertable?

        cy.server();

        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
          .as('postNewTable');

        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
          .as('postUserTable');

        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
          .as('getNewTable');
        
        // elementos
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^="Last"]').type(chance.last());
        cy.get('input[ng-model^="Email"]').type(chance.email());
        cy.get('input[ng-model^="Phone"]').type(chance.phone({ formatted: false }));
        
        cy.get('input[value="Male"]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        cy.get('select#Skills').select('Programming');
        cy.get('select#countries').select('Brazil');
        cy.get('select#country').select('Australia', { force: true });
        cy.get('select#yearbox').select('2000');
        cy.get('select[ng-model^=month]').select('July');
        cy.get('select#daybox').select('1');

        cy.get('input#firstpassword').type('@Non1mo@');
        cy.get('input#secondpassword').type('@Non1mo@');
        
        cy.get('input#imagesrc').attachFile('img/img.png');

        cy.get('button#submitbtn').click(); 
        
        cy.wait('@postNewTable').then( resNewTable => {
            expect(resNewTable.status).to.eq(200);
        });

        cy.wait('@postUserTable').then( resUserTable => {
            expect(resUserTable.status).to.eq(200);
        });

        //cy.wait('@getNewTable').then( resNewTable => {
        //    cy.log(resNewTable.status);
        //});

        cy.url()
          .should('contain', 'WebTable');
    });
});