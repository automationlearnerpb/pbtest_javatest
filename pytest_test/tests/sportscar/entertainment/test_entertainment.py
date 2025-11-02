from pytest import mark


@mark.entertainment
@mark.ui
def test_entertainment_as_expected(chrome_browser):
    """Placeholder test for entertainment behavior."""
    chrome_browser.get("https://www.saucedemo.com/")
    assert True