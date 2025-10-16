package com.example.framework.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;


public class LoginSteps {


    @Given("I am on Generator")
    public void i_am_on_generator() {
        // Write code here that turns the phrase above into concrete actions
       //driver.get("https://local.gai.webperfdev.com:8443/collections");
        System.out.println("When step");
    }
    @When("I provide valid admin user details")
    public void i_provide_valid_admin_user_details() {
        // Write code here that turns the phrase above into concrete actions
        System.out.println("When step");
    }
    @Then("I can login to Generator")
    public void i_can_login_to_generator() {
        // Write code here that turns the phrase above into concrete actions
        System.out.println("Then step");
    }
    @Then("the collections page is loaded")
    public void the_collections_page_is_loaded() {
        // Write code here that turns the phrase above into concrete actions
        System.out.println("Then step");
    }
}
