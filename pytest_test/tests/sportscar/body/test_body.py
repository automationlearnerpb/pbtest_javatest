from pytest import mark

@mark.ui
def test_can_navigate_to_ui(chrome_browser):    
    chrome_browser.get("https://www.saucedemo.com/")
    assert True