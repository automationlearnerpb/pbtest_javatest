package com.example.framework.steps;

import com.example.framework.core.Config;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.time.Duration;

import static com.example.framework.core.DriverFactory.getDriver;

public class DAILoginSteps {

    private static final WebDriver driver = getDriver();
    String adminUser = Config.get("dai_admin_user");
    String adminPassword = Config.get("dai_admin_password");
    String daiUrl = Config.get("daiUrl");

    @Given("I am on DAI page")
    public void i_am_on_dai_page() {
        // Write code here that turns the phrase above into concrete actions
        driver.get(daiUrl);
    }
    @When("I provide valid dai admin user details")
    public void i_provide_valid_dai_admin_user_details() {
        // Write code here that turns the phrase above into concrete actions
        driver.findElement(By.cssSelector("input[name='username']"));
        driver.findElement(By.id("username")).sendKeys(adminUser);
        driver.findElement(By.id("password")).sendKeys(adminPassword);

    }
    @Then("I can login to DAI")
    public void i_can_login_to_dai() {
        // Write code here that turns the phrase above into concrete actions
        driver.findElement(By.id("kc-login")).click();
    }
    @Then("the dashboards page is loaded")
    public void the_dashboards_page_is_loaded() {
        By dashboardLink = By.cssSelector("[aria-label='Dashboard']");
        WebElement element = new WebDriverWait(driver, Duration.ofSeconds(2)).until(ExpectedConditions.visibilityOfElementLocated(dashboardLink));
        // Write code here that turns the phrase above into concrete actions
        Assert.assertTrue(element.isDisplayed(),
                "Expected Import button to be visible on the page");
    }
}
