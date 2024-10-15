describe('HTML Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html'); // Visit the local HTML page
    });

    it('should display the main heading correctly', () => {
        cy.get('h1').first().should('have.text', 'HMTL Page'); // Check the main heading text
    });

    it('should display the first paragraph heading correctly', () => {
        cy.get('div h1').first().should('have.text', 'First Paragraph'); // Check the first paragraph heading text
    });

    it('should have three boxes with correct IDs', () => {
        cy.get('#box1').should('exist');
        cy.get('#box2').should('exist');
        cy.get('#box3').should('exist');
    });

    it('should display correct text inside boxes', () => {
        cy.get('#box1').should('have.text', 'Box 1');
        cy.get('#box2').should('have.text', 'Box 2');
        cy.get('#box3').should('have.text', 'Box 3');
    });

    it('should have the third box with red background', () => {
        cy.get('#box1').should('have.css', 'background-color', 'rgb(255, 0, 0)'); // Check if the third box is red
    });

    it('should accept input in the name field and display it on submit', () => {
        const name = 'John Doe';

        cy.get('#nameInput').type(name); // Type a name in the input field
        cy.get('#submitBtn').click(); // Click the submit button
        cy.get('#outcome').should('contain.text', name); // Check if the outcome displays the entered name
    });

    it('should display multiple names in the outcome on multiple submissions', () => {
        const names = ['Alice', 'Bob', 'Charlie'];

        names.forEach((name) => {
            cy.get('#nameInput').clear().type(name); // Clear and type a name
            cy.get('#submitBtn').click(); // Click the submit button
        });

        names.forEach((name) => {
            cy.get('#outcome').should('contain.text', name); // Check if all names are displayed in outcome
        });
    });

    it('should clear the input field after submission', () => {
        const name = 'Jane Doe';

        cy.get('#nameInput').type(name); // Type a name in the input field
        cy.get('#submitBtn').click(); // Click the submit button
        cy.get('#nameInput').should('be.empty'); // Check if the input field is empty after submission
    });

    it('should have a password input field', () => {
        cy.get('#pwd').should('exist'); // Check if the password input field exists
    });

    it('should have the correct placeholder text in the name input field', () => {
        cy.get('#nameInput').should('have.attr', 'placeholder', 'Your name:'); // Check the placeholder text
    });
});