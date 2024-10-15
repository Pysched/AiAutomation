const { test, expect } = require('@playwright/test');

test.describe('TodoMVC Tests', () => {
    test('toDoTest', async ({ page }) => {
        // Navigate to the TodoMVC demo site
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Add todos
        await page.getByPlaceholder('What needs to be done?').fill('collect kids');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        await page.getByPlaceholder('What needs to be done?').fill('go gym');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        await page.getByPlaceholder('What needs to be done?').fill('read book');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        await page.getByPlaceholder('What needs to be done?').fill('watch tv');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Mark "collect kids" and "read book" as completed
        await page.locator('li').filter({ hasText: 'collect kids' }).getByLabel('Toggle Todo').check();
        await page.locator('li').filter({ hasText: 'read book' }).getByLabel('Toggle Todo').check();

        // Click on the "Completed" filter and verify completed items
        await page.getByRole('link', { name: 'Completed' }).click();
        const completedTodos = page.locator('.todo-list li.completed');
        await expect(completedTodos).toHaveCount(2); // Should see 2 completed todos

        // Click on the "Active" filter and verify active items
        await page.getByRole('link', { name: 'Active' }).click();
        const activeTodos = page.locator('.todo-list li:not(.completed)');
        await expect(activeTodos).toHaveCount(2); // Should see 2 active todos

        // Optionally, check the text of the active todos
        const activeTodoTexts = await activeTodos.allTextContents();
        expect(activeTodoTexts).toEqual(['go gym', 'watch tv']); // Verify the active todos

        // Reload the page
        await page.reload();

        // Wait for the completed items to appear after reload
        await page.waitForTimeout(1000); // Adjust the timeout as necessary

        // Verify that completed items are still checked
        const reloadedCompletedTodos = page.locator('.todo-list li.completed');
        await expect(reloadedCompletedTodos).toHaveCount(2); // Should still see 2 completed items

        // Verify that "collect kids" and "read book" are still completed
        const isCollectKidsChecked = await page.locator('li').filter({ hasText: 'collect kids' }).getByLabel('Toggle Todo').isChecked();
        const isReadBookChecked = await page.locator('li').filter({ hasText: 'read book' }).getByLabel('Toggle Todo').isChecked();

        expect(isCollectKidsChecked).toBe(true); // Should be checked
        expect(isReadBookChecked).toBe(true); // Should be checked

        // Verify that "go gym" and "watch tv" are still active
        const isGoGymChecked = await page.locator('li').filter({ hasText: 'go gym' }).getByLabel('Toggle Todo').isChecked();
        const isWatchTVChecked = await page.locator('li').filter({ hasText: 'watch tv' }).getByLabel('Toggle Todo').isChecked();

        expect(isGoGymChecked).toBe(false); // Should not be checked
        expect(isWatchTVChecked).toBe(false); // Should not be checked
    });
});