package com.example.framework.core;

//import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

public class DriverFactory {

    private static final ThreadLocal<WebDriver> webDriverThreadLocal = new ThreadLocal<>();
    //private static Object Duration;

    public static WebDriver getDriver() {
        if (webDriverThreadLocal.get() == null) {
            webDriverThreadLocal.set(create());
        }
        return webDriverThreadLocal.get();
    }

    private static WebDriver create() {
        String browser = Config.get("browser").toLowerCase();
        boolean headless = Boolean.parseBoolean(Config.get("headless"));

        WebDriver driver = null;

        switch (browser) {
            case "chrome" -> {
                //WebDriverManager.chromedriver().setup(); // or rely on Selenium Manager
                ChromeOptions options = new ChromeOptions();
                if (headless) options.addArguments("--headless=new");
                options.addArguments("--start-maximized");
                options.addArguments("--incognito");
                options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
                driver =  new ChromeDriver(options);
                break;
            }
            case "firefox" -> {
                //WebDriverManager.firefoxdriver().setup();
                FirefoxOptions options = new FirefoxOptions();
                if (headless) options.addArguments("-headless");
                options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
                driver = new FirefoxDriver(options);
                break;
            }
            case "edge" -> {
                //WebDriverManager.edgedriver().setup();
                EdgeOptions options = new EdgeOptions();
                options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
                driver = new EdgeDriver(options);
                break;
            }
            default -> throw new IllegalArgumentException("Unsupported browser: " + browser);
        }
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)); // Waits up to 10 seconds
        return driver;
    }

    public static void cleanupDriver() {
        WebDriver driver = webDriverThreadLocal.get();
        if (driver != null) {
            try { driver.quit(); } catch (Exception ignored) {}
            webDriverThreadLocal.remove();
        }
    }
}
