describe('Deve realizar um publicação dentro da rede social', () => {
    it('Deve realizar uma publicação', () => {
        cy.visit('https://sesoft-uni-web.vercel.app');

        cy.get('input[type="email"]').type('leonardo@hotmail.com');
        cy.get('input[type="password"]').type('leonardo');

        cy.get('button[type="button"]').click();

        cy.url().should('eq', 'https://sesoft-uni-web.vercel.app/home/feed');

        cy.get('button[type="button"]').click();

        cy.get('textarea').type('teste envio de realização de publicação');

        cy.get('button').contains('Publicar').click();
    });
});
