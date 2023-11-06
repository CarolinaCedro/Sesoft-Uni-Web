describe('Teste de Login', () => {
    it('Deve fazer login com sucesso', () => {
        cy.visit('https://sesoft-uni-web.vercel.app');

        cy.get('input[type="email"]').type('leonardo@hotmail.com');
        cy.get('input[type="password"]').type('leonardo');

        cy.get('button[type="button"]').click();

        cy.url().should('eq', 'https://sesoft-uni-web.vercel.app/home/feed');
    });

    it('Deve exibir uma mensagem de erro em caso de login inválido', () => {
        cy.visit('https://sesoft-uni-web.vercel.app');

        cy.get('input[type="email"]').type('leonardo@hotmail.com');
        cy.get('input[type="password"]').type('senhatotalmenterradadigitada');

        cy.get('button[type="button"]').click();

        cy.get('.login-error').should('be.visible');
    });
});
