@DAILogin
Feature: DAI Login

  @sanity
  Scenario: Login as an Admin user in DAI
    Given I am on DAI page
    When I provide valid dai admin user details
    Then I can login to DAI
    And the dashboards page is loaded

  @sanity
  Scenario: Login as an Normal user in DAI
    Given I am on DAI page
    When I provide valid dai admin user details
    Then I can login to DAI
    And the dashboards page is loaded
