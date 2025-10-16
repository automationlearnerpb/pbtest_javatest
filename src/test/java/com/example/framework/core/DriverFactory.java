package com.example.framework.core;

//import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class DriverFactory {

    private static final ThreadLocal<WebDriver> webDriverThreadLocal = new ThreadLocal<>();
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
                driver =  new ChromeDriver(options);
                break;
            }
            case "firefox" -> {
                //WebDriverManager.firefoxdriver().setup();
                FirefoxOptions options = new FirefoxOptions();
                if (headless) options.addArguments("-headless");
                driver = new FirefoxDriver(options);
                break;
            }
            case "edge" -> {
                //WebDriverManager.edgedriver().setup();
                EdgeOptions options = new EdgeOptions();
                driver = new EdgeDriver(options);
                break;
            }
            default -> throw new IllegalArgumentException("Unsupported browser: " + browser);
        }
        driver.manage().window().maximize();
        return driver;
    }

    public static void cleanupDriver() {
        webDriverThreadLocal.get().quit();
        webDriverThreadLocal.remove();
    }
}
