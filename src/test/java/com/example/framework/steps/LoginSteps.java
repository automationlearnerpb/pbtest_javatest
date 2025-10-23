package com.example.framework.steps;

import com.example.framework.core.Config;
import com.example.framework.pages.BasePage;
import com.example.framework.pages.SwagLabsHomePage;
import com.example.framework.pages.LoginPage;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;



public class LoginSteps  extends BasePage {


    String adminUser = Config.get("admin_user");
    String adminPassword = Config.get("swag_password");


    private LoginPage loginPage = new LoginPage();
    private SwagLabsHomePage collectionsPage;


    @Given("I am on Generator")
    public void i_am_on_generator() {
        loginPage.navigateToGeneratorLoginPage();

    }
    @When("I provide valid {word} user details")
    public void i_provide_valid_admin_normal_user_details(String userType) {
        // Write code here that turns the phrase above into concrete actions
        if (userType.toLowerCase().equals("admin")) {
            loginPage.setUserName(adminUser);
            loginPage.setPassword(adminPassword);
        } else if (userType.toLowerCase().equals("normal")) {
            loginPage.setUserName(Config.get("swag_user"));
            loginPage.setPassword(adminPassword);
        }


    }
    @Then("I can login to Generator")
    public void i_can_login_to_generator() {
        // Write code here that turns the phrase above into concrete actions
        collectionsPage = loginPage.clicksignIn();
    }
    @Then("the collections page is loaded")
    public void the_collections_page_is_loaded() {
           Assert.assertTrue(collectionsPage.isLoaded(), "Failed to load collections page");
    }


}
