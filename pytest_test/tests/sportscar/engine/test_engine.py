from pytest import mark


@mark.engine
@mark.ui
def test_engine_as_expected(chrome_browser):
    """Placeholder test for entertainment behavior."""
    chrome_browser.get("https://www.saucedemo.com/")
    assert True
    