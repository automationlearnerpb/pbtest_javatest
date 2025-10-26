package com.example.framework.core.runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
        //features = "src/test/resources/features",
        features = {"classpath:features"},
        glue = {"com.example.framework.steps", "com.example.framework.hooks"},
        tags = "@GeneratorLogin",
        plugin = {"pretty", "summary", "html:target/cucumber-reports.html", "json:target/cucumber-report.json"},
        monochrome = true
)
public class RunTest extends AbstractTestNGCucumberTests {
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
         return super.scenarios();
    }
    // No code needed here — TestNG will handle execution.
}
