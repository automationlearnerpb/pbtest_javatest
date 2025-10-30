from pytest import mark
from selenium import webdriver

@mark.ui
def test_can_navigate_to_ui():
    browser = webdriver.Chrome()
    browser.get("https://www.saucedemo.com/")
    assert True