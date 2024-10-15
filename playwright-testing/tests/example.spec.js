const { test, expect } = require('@playwright/test');

test.describe('HTML Page Tests', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        // Launch a new browser instance
        const context = await browser.newContext();
        page = await context.newPage();

        // Load your HTML file
        await page.goto('http://127.0.0.1:5500/index.html');
    });

    test.afterAll(async () => {
        // Close the browser context after all tests
        await page.context().close();
    });

    test('Check main heading text and color', async () => {
        const mainHeading = page.locator('h1').nth(0);
        await expect(mainHeading).toHaveText('HMTL Page');
        await expect(mainHeading).toHaveCSS('color', 'rgb(255, 0, 0)'); // Red color
    });

    test('Check div headings and color', async () => {
        const divHeading = page.locator('div h1').nth(0);
        await expect(divHeading).toHaveText('First Paragraph');
        await expect(divHeading).toHaveCSS('color', 'rgb(0, 0, 255)'); // Blue color
    });

    // test('Check boxes and their styles', async () => {
    //     const boxes = page.locator('.box');
    //     await expect(boxes).toHaveCount(3);
    //     await expect(boxes.nth(0)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)'); // Default (transparent)
    //     await expect(boxes.nth(1)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)'); // Default (transparent)
    //     await expect(boxes.nth(2)).toHaveCSS('background-color', 'rgb(255, 0, 0)'); // Red background
    // });

    test('Input and submit functionality', async () => {
        const input = page.locator('#nameInput');
        const btn = page.locator('#submitBtn');
        const outcome = page.locator('#outcome');

        // Input a name and click the submit button
        await input.fill('John Doe');
        await btn.click();

        // Check if the outcome displays the name
        await expect(outcome).toContainText('John Doe');

        // Verify if the list is created with the input value
        const listItems = outcome.locator('li');
        await expect(listItems).toHaveCount(1);
        await expect(listItems.nth(0)).toHaveText('John Doe');
    });

    test('Input multiple names', async () => {
        const input = page.locator('#nameInput');
        const btn = page.locator('#submitBtn');
        const outcome = page.locator('#outcome');

        // Clear the outcome before starting the test
        await outcome.evaluate(el => {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });

        // First submission
        await input.fill('Alice');
        await btn.click();
        await expect(outcome).toContainText('Alice');

        // Second submission
        await input.fill('Bob');
        await btn.click();
        await expect(outcome).toContainText('Bob');

        // Check total list items
        const listItems = outcome.locator('li');
        await expect(listItems).toHaveCount(3);
        await expect(listItems.nth(0)).toHaveText('John Doe');
        await expect(listItems.nth(1)).toHaveText('Alice');
        await expect(listItems.nth(2)).toHaveText('Bob');
    });
});