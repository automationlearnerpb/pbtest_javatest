// pages/welcome-page.js
const { expect } = require('@playwright/test');
const {
  logStep,
  enterText,
  clickSubmit,
  clickCancel,
  selectAnOptionFromDropDown,
} = require('../utilities/common');

class WelcomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Core UI elements
    this.heading = page.locator('h1');
    // More permissive subheading locator to avoid structural coupling
    this.subHeading = page.locator('div.jumbotron p').first();

    // Dropdowns
    this.fromCitySelect = page.locator('select[name="fromPort"]');
    this.toCitySelect = page.locator('select[name="toPort"]');

    // CTA to search flights
    this.findFlightsButton = page.getByRole('button', { name: 'Find Flights' });

    // “destination of the week!” link
    this.destinationOfTheWeekLink = page.getByRole('link', {
      name: /destination of the week/i,
    });
  }

  async goto() {
    logStep('Navigating to BlazeDemo welcome page');
    await this.page.goto('https://blazedemo.com/');
  }

  async assertOnWelcomePage() {
    logStep('Asserting welcome page heading is visible');
    await expect(this.heading).toHaveText('Welcome to the Simple Travel Agency!');
  }

  async selectRoute(fromCity, toCity) {
    await selectAnOptionFromDropDown(this.fromCitySelect, fromCity);
    await selectAnOptionFromDropDown(this.toCitySelect, toCity);
  }

  async searchFlights() {
    await clickSubmit(this.findFlightsButton);
  }

  async getDepartureOptions() {
    return this.fromCitySelect.locator('option').allTextContents();
  }

  async getDestinationOptions() {
    return this.toCitySelect.locator('option').allTextContents();
  }

  async clickDestinationOfTheWeek() {
    await clickSubmit(this.destinationOfTheWeekLink);
  }
}

module.exports = { WelcomePage };
