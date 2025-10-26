package com.example.framework.pages;

import com.example.framework.core.Config;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    //private WebDriver driver;

    private String generatorUrl = Config.get("gaiUrl");
    private @FindBy(id = "user-name")
    WebElement loginUserNameTextField;

    private @FindBy(id = "password")
    WebElement loginPasswordTextField;

    private @FindBy(id = "login-button")
    WebElement signinButton;

    private @FindBy(css = "[data-test='primary-header']")
    WebElement signInPageTitle;

    public LoginPage() {
        super();
    }

    public void navigateToGeneratorLoginPage(){
        navigateToUrl(generatorUrl);
    }

    public void setUserName(String username){
        sendKeys(loginUserNameTextField, username);
    }

    public void setPassword(String password){
        sendKeys(loginPasswordTextField, password);
    }

    public SwagLabsHomePage clicksignIn(){
        clickSubmit(signinButton);
        return new SwagLabsHomePage();
    }

}
