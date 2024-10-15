const { Builder, By, until } = import('selenium-webdriver');
const chrome = import('selenium-webdriver/chrome');

(async function todoTest() {
    // Set up Chrome options
    let options = new chrome.Options();
    options.addArguments('--headless'); // Run headless if you don't need a UI

    // Create a WebDriver instance
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the TodoMVC demo site
        await driver.get('https://demo.playwright.dev/todomvc/#/');

        // Add todos
        const todoInput = await driver.findElement(By.xpath('//input[@placeholder="What needs to be done?"]'));

        const todosToAdd = ['collect kids', 'go gym', 'read book', 'watch tv'];
        for (const todo of todosToAdd) {
            await todoInput.sendKeys(todo);
            await todoInput.sendKeys('\uE007'); // Press Enter
        }

        // Mark "collect kids" and "read book" as completed
        await driver.findElement(By.xpath('//li[.//label[text()="collect kids"]]/div/input')).click();
        await driver.findElement(By.xpath('//li[.//label[text()="read book"]]/div/input')).click();

        // Click on the "Completed" filter and verify completed items
        await driver.findElement(By.linkText('Completed')).click();
        let completedTodos = await driver.findElements(By.css('.todo-list li.completed'));
        console.assert(completedTodos.length === 2, 'Expected 2 completed todos');

        // Click on the "Active" filter and verify active items
        await driver.findElement(By.linkText('Active')).click();
        let activeTodos = await driver.findElements(By.css('.todo-list li:not(.completed)'));
        console.assert(activeTodos.length === 2, 'Expected 2 active todos');

        // Verify the text of the active todos
        const activeTodoTexts = await Promise.all(activeTodos.map(async (todo) => {
            const label = await todo.findElement(By.tagName('label'));
            return label.getText();
        }));
        console.assert(JSON.stringify(activeTodoTexts) === JSON.stringify(['go gym', 'watch tv']), 'Active todos do not match expected values');

        // Reload the page
        await driver.navigate().refresh();
        await driver.wait(until.elementLocated(By.css('.todo-list')), 5000); // Wait for the todo list to be present

        // Verify that completed items are still checked
        completedTodos = await driver.findElements(By.css('.todo-list li.completed'));
        console.assert(completedTodos.length === 2, 'Expected 2 completed items after reload');

        // Check that "collect kids" and "read book" are still completed
        const isCollectKidsChecked = await driver.findElement(By.xpath('//li[.//label[text()="collect kids"]]/div/input')).isSelected();
        console.assert(isCollectKidsChecked, '"collect kids" should be checked');

        const isReadBookChecked = await driver.findElement(By.xpath('//li[.//label[text()="read book"]]/div/input')).isSelected();
        console.assert(isReadBookChecked, '"read book" should be checked');

        // Verify that "go gym" and "watch tv" are still active
        const isGoGymChecked = await driver.findElement(By.xpath('//li[.//label[text()="go gym"]]/div/input')).isSelected();
        console.assert(!isGoGymChecked, '"go gym" should not be checked');

        const isWatchTVChecked = await driver.findElement(By.xpath('//li[.//label[text()="watch tv"]]/div/input')).isSelected();
        console.assert(!isWatchTVChecked, '"watch tv" should not be checked');

        console.log('All tests passed!');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit(); // Ensure the driver is closed
    }
})();