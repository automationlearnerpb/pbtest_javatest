package com.example.framework.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static com.example.framework.core.DriverFactory.cleanupDriver;
import static com.example.framework.core.DriverFactory.getDriver;

public class Hooks {

    @Before
    public void setupDriver(){
        System.out.println("Before Hook step");
        getDriver();
    }

    @After
    public void tearDown(Scenario scenario) {
        System.out.println("After Hook step");
        WebDriver driver = getDriver(); // fetch from ThreadLocal
        if (driver != null) {
            if (scenario.isFailed() && driver instanceof TakesScreenshot ts) {
                byte[] shot = ts.getScreenshotAs(OutputType.BYTES);
                scenario.attach(shot, "image/png", "failed-step");
            }
            driver.quit();
        }
        cleanupDriver(); // removes ThreadLocal reference
    }
}
