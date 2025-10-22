@GeneratorLogin
Feature: Generator Login

  @sanity
  Scenario: Login as an Admin user
    Given I am on Generator
    When I provide valid admin user details
    Then I can login to Generator
    And the collections page is loaded

  @sanity
  Scenario: Login and access the context files page
    Given I login to Generator as a normal user
    Then I should be able to view the context files

