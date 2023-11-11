describe('Deve interagir em outras publicações', () => {
    it('Deve realizar uma publicação', () => {
        cy.visit('https://sesoft-uni-web.vercel.app');

        cy.get('input[type="email"]').type('leonardo@hotmail.com');
        cy.get('input[type="password"]').type('leonardo');

        cy.get('button[type="button"]').click();

        cy.url().should('eq', 'https://sesoft-uni-web.vercel.app/home/feed');

        cy.wait(2000);

        cy.get('i.fa-solid.fa-heart').each(($element, index) => {
            if (index < 5) {
              cy.wrap($element).click();
            }
          });
    });
});
