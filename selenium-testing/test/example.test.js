import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Example.com H1 Test', function () {
    let driver;

    this.timeout(10000); // Increase timeout to 10 seconds

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should find an h1 element with text "Example"', async function () {
        await driver.get('https://dayz.com');

        // Wait for the h1 element to be present
        const h1Element = await driver.wait(until.elementLocated(By.css('h1')), 5000);

        // Get the text of the h1 element
        const h1Text = await h1Element.getText();

        // Assert that the text is "Example"
        expect(h1Text).to.equal('Dayz');
    });
});