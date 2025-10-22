package com.example.framework.steps;

import com.example.framework.core.Config;
import com.example.framework.pages.BasePage;
import com.example.framework.pages.LoginPage;
import io.cucumber.java.PendingException;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.time.Duration;

import static com.example.framework.core.DriverFactory.getDriver;


public class LoginSteps  extends BasePage {
    private WebDriver driver = getDriver();
    String adminUser = Config.get("admin_user");
    String adminPassword = Config.get("admin_password");

    private LoginPage loginPage;

    public LoginSteps(LoginPage loginpage){
        this.loginPage = loginpage;

    }

    @Given("I am on Generator")
    public void i_am_on_generator() {
        loginPage.navigateToGeneratorLoginPage();

    }
    @When("I provide valid admin user details")
    public void i_provide_valid_admin_user_details() {
        // Write code here that turns the phrase above into concrete actions
          loginPage.setUserName(adminUser);
          //sendKeys(By.id("username"), adminUser);
          sendKeys(By.id("password"), adminPassword);
          //driver.findElement(By.id("username")).sendKeys(adminUser);
          //driver.findElement(By.id("password")).sendKeys(adminPassword);


    }
    @Then("I can login to Generator")
    public void i_can_login_to_generator() {
        // Write code here that turns the phrase above into concrete actions
        //driver.findElement(By.id("kc-login")).click();
        clickSubmit(By.id("kc-login"));
    }
    @Then("the collections page is loaded")
    public void the_collections_page_is_loaded() {
        By collectionsHeader = By.cssSelector(".documents-header-min");
        WebElement element = new WebDriverWait(driver, Duration.ofSeconds(2)).until(ExpectedConditions.visibilityOfElementLocated(collectionsHeader));
        // Write code here that turns the phrase above into concrete actions
        if (element.isDisplayed()){
            Assert.assertTrue(element.isDisplayed(),
                "Expected Import button to be visible on the page");
            Assert.assertTrue(element.getAttribute("innerText").trim().toLowerCase().contains("collections"));
        }


    }

    @Given("I login to Generator as a normal user")
    public void iLoginToGeneratorAsANormalUser() {
        // Write code here that turns the phrase above into concrete actions
        navigateToUrl("https://local.gai.webperfdev.com:8443/");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[name='username']")));
        sendKeys(By.id("username"), "pbuser");
        sendKeys(By.id("password"), "wibblewobble");
        clickSubmit(By.id("kc-login"));
    }

    @Then("I should be able to view the context files")
    public void iShouldBeAbleToViewTheContextFiles() {
        // Write code here that turns the phrase above into concrete actions
        By contextTable = By.cssSelector("div.overflow-y-auto.context-table-content");
        driver.findElement(By.linkText("/context-files")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3)); // Adjust timeout as needed
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(contextTable));
        Assert.assertTrue(element.isDisplayed(),
                "Expected context table is not displayed");
        //System.out.println("I should be able to see context step");


    }
}
