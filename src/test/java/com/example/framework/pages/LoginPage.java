package com.example.framework.pages;

import com.example.framework.core.Config;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {
    private String generatorUrl = Config.get("gaiUrl");
    private @FindBy(id = "username")
    WebElement loginUserName;

    public LoginPage() {
        super();
    }

    public void navigateToGeneratorLoginPage(){
        navigateToUrl(generatorUrl);
    }

    public void setUserName(String username){
        sendKeys(loginUserName, username);
    }

}
