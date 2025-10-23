package com.example.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SwagLabsHomePage extends BasePage {

    private @FindBy(css = ".app_logo")
    WebElement swagLabsPageTitle;



    public SwagLabsHomePage()
    {
        super();
    }

    public boolean isLoaded() {
        return isVisible(By.cssSelector(".app_logo")) != null;
    }



}
