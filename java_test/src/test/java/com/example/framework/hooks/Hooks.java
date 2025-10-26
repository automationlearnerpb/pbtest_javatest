package com.example.framework.hooks;

import com.example.framework.core.DriverFactory;
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
        DriverFactory.getDriver();
    }

    @After
    public void tearDown(Scenario scenario) {
        System.out.println("After Hook step");
        if (scenario.isFailed()) {
            // Take screenshot if the scenario failed
            byte[] screenshot = ((TakesScreenshot) DriverFactory.getDriver()).getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", scenario.getName());
        }
        DriverFactory.cleanupDriver();
    }
}
