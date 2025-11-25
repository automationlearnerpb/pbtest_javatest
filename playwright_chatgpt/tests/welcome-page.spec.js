// tests/welcome-page.spec.js
const { test, expect } = require('@playwright/test');
const { WelcomePage } = require('../pages/welcome-page');
const { logStep } = require('../utilities/common');
const LOG_PREFIX = '[welcome-page-test]';

test.describe('BlazeDemo Welcome Page', () => {
  test('should display core welcome UI elements', async ({ page }) => {
    const welcomePage = new WelcomePage(page);

    logStep('Navigating to welcome page', LOG_PREFIX);
    await welcomePage.goto();
    logStep('Asserting welcome page hero and inputs are visible', LOG_PREFIX);
    await welcomePage.assertOnWelcomePage();

    await expect(welcomePage.subHeading).toBeVisible();
    await expect(welcomePage.fromCitySelect).toBeVisible();
    await expect(welcomePage.toCitySelect).toBeVisible();
    await expect(welcomePage.findFlightsButton).toBeVisible();
    await expect(welcomePage.destinationOfTheWeekLink).toBeVisible();
  });

  test('should list all expected departure and destination cities', async ({ page }) => {
    const welcomePage = new WelcomePage(page);

    logStep('Opening welcome page to verify city lists',  LOG_PREFIX);
    await welcomePage.goto();

    const expectedFromCities = [
      'Paris',
      'Philadelphia',
      'Boston',
      'Portland',
      'San Diego',
      'Mexico City',
      'São Paolo',
    ];

    const expectedToCities = [
      'Buenos Aires',
      'Rome',
      'London',
      'Berlin',
      'New York',
      'Dublin',
      'Cairo',
    ];

    logStep('Collecting departure and destination options from dropdowns', LOG_PREFIX);
    const fromOptions = await welcomePage.getDepartureOptions();
    const toOptions = await welcomePage.getDestinationOptions();

    // Basic length check
    await expect(fromOptions).toHaveLength(expectedFromCities.length);
    await expect(toOptions).toHaveLength(expectedToCities.length);

    // Order + content check
    expect(fromOptions).toEqual(expectedFromCities);
    expect(toOptions).toEqual(expectedToCities);
  });

  test('should allow user to search flights from Boston to London', async ({ page }) => {
    const welcomePage = new WelcomePage(page);

    logStep('Navigating to welcome page before searching flights', LOG_PREFIX);
    await welcomePage.goto();
    logStep('Selecting route Boston -> London and submitting search', LOG_PREFIX);
    await welcomePage.selectRoute('Boston', 'London');
    await welcomePage.searchFlights();

    // Assert we navigated to the results page (/reserve.php)
    await expect(page).toHaveURL(/\/reserve\.php/);

    // Sanity check: page shows the correct route in the heading
    const resultsHeading = page.locator('h3');
    await expect(resultsHeading).toContainText('Flights from Boston to London');
  });

  test('destination of the week link should navigate to a details page', async ({ page }) => {
    const welcomePage = new WelcomePage(page);

    logStep('Navigating to welcome page to follow destination of the week link', LOG_PREFIX);
    await welcomePage.goto();

    const oldUrl = page.url();
    logStep('Clicking destination of the week link and verifying navigation', LOG_PREFIX);
    await welcomePage.clickDestinationOfTheWeek();

    // Simple assertion that URL changed and we landed somewhere non-empty
    await expect(page).not.toHaveURL(oldUrl);
    await expect(page).not.toHaveURL('about:blank');
  });
});
