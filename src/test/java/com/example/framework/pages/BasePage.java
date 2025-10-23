package com.example.framework.pages;

import com.example.framework.core.DriverFactory;
import io.cucumber.core.internal.com.fasterxml.jackson.databind.ser.Serializers;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class BasePage {

    protected WebDriver driver;

    public BasePage(){
        this.driver = getDriver();
        PageFactory.initElements(this.driver, this);
    }

    //This is a method of implementing verify landing page. Change the return value to True.
    //This abstract method can only be implemented in an abstract class
    //protected abstract void ensureOnPage(){};

    protected WebDriver getDriver() {
        return DriverFactory.getDriver();
    }

    protected void navigateToUrl(String url){
        this.driver.get(url);
    }

    protected void sendKeys(By by, String textToType){
        WebDriverWait wait = new WebDriverWait(this.driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.elementToBeClickable(by)).sendKeys(textToType);
    }

    protected void sendKeys(WebElement element, String textToType){
        WebDriverWait wait = new WebDriverWait(this.driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.elementToBeClickable(element)).sendKeys(textToType);
    }

    protected void clickSubmit(By by){
        WebDriverWait wait = new WebDriverWait(this.driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.elementToBeClickable(by)).click();
    }

    protected void clickSubmit(WebElement element){
        WebDriverWait wait = new WebDriverWait(this.driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.elementToBeClickable(element)).click();
    }

    protected WebElement isVisible(By locator){
        WebDriverWait wait = new WebDriverWait(this.driver, Duration.ofSeconds(5));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
}
