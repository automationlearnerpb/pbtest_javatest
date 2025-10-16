package com.example.framework.core.runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
        //features = "src/test/resources/features",
        features = {"classpath:features"},
        glue = {"com.example.framework.steps", "com.example.framework.core.hooks"},
        tags = "@sanity",
        plugin = {"pretty", "summary", "html:target/cucumber-reports.html", "json:target/cucumber-report.json"},
        monochrome = true
)
public class RunTest extends AbstractTestNGCucumberTests {
    // No code needed here — TestNG will handle execution.
}
