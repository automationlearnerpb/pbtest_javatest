package com.example.framework.core;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static com.example.framework.core.DriverFactory.cleanupDriver;
import static com.example.framework.core.DriverFactory.getDriver;

public class Hooks {
    public WebDriver driver;

    @Before
    public void setupDriver(){
        getDriver();
    }

    @After
    public void tearDown() {
        cleanupDriver();
    }
}
