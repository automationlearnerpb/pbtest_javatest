@login
Feature: Generator Login

  @sanity
  Scenario: Login as an Admin user
    Given I am on Generator
    When I provide valid admin user details
    Then I can login to Generator
    And the collections page is loaded
