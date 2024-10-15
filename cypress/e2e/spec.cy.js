
describe('Cypress Kitchen Sink', () => {
  it('Checks if the heading contains "Kitchen Sink"', () => {
    cy.visit('https://example.cypress.io');
    cy.get('h1').should('have.text', 'Kitchen Sink');
  });
  // Test 1 - Querying link
  it('should have a clickable "Querying" link in the home list', () => {
    // Visit the Cypress Kitchen Sink page 
    cy.visit('https://example.cypress.io');

    // Target the "Querying" link inside the ul with class 'home-list' 
    cy.get('ul.home-list').contains('a', 'Querying').should('be.visible').click();
    // Check that clicking the link navigates to the correct URL 
    cy.url().should('include', '/commands/querying');
    // Check that the new page has the correct heading 
    cy.get('h1').should('have.text', 'Querying');
  });
  // Test 2 - Traversal Link
  it('should find the Traversal link, verify it is a link, and navigate correctly', () => {
    // Step 1: Visit the Cypress Kitchen Sink page
    cy.visit('https://example.cypress.io');

    // Step 2: Get the element using the provided selector
    cy.get('.home-list > :nth-child(2) > :nth-child(1)')
      .should('be.visible') // Check if the element is visible
      .should('have.prop', 'tagName', 'A') // Ensure it's an anchor (link) tag
      .should('have.attr', 'href') // Ensure it has an href attribute

    // Step 3: Click the Traversal link
    cy.get('.home-list > :nth-child(2) > :nth-child(1)').click();

    // Step 4: Verify that clicking the link navigates to the correct URL
    cy.url().should('include', '/commands/traversal');

    // Step 5: Verify the new page has the correct "Traversal" heading
    cy.get('h1').should('have.text', 'Traversal');

    // Step 6: Visit the "children" link directly
    cy.visit('https://docs.cypress.io/api/commands/children');

    // Step 7: Verify that we're on the "children" page
    cy.url().should('include', 'https://docs.cypress.io/api/commands/children');

    // Step 8: Return to the Traversal page
    cy.go('back');

    // Step 9: Verify we're back on the Traversal page by checking the heading again
    cy.get('h1').should('have.text', 'Traversal');

    // Step 10: Visit the "closest" link directly
    cy.visit('https://docs.cypress.io/api/commands/closest');

    // Step 11: Verify that we're on the "closest" page
    cy.url().should('include', 'https://docs.cypress.io/api/commands/closest');

    // Step 12: Return to the Traversal page again
    cy.go('back');

    // Step 13: Verify we're back on the Traversal page by checking the heading one more time
    cy.get('h1').should('have.text', 'Traversal');
  });
  // Test 3 - 

});