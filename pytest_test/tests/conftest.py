import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

@pytest.fixture
def browser_auto():
    """Create a Chrome browser instance for tests and quit when done."""
    options = Options()
    # Uncomment to run headless:
    # options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.fixture(scope="function")
def chrome_browser():
    """Create a Chrome browser instance for tests and quit when done."""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()


