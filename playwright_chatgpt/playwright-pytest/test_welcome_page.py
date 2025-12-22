# playwright-pytest/test_welcome_page.py
import re
from playwright.sync_api import Page, expect

PREFIX = "[welcome-page-pytest]"

def log_step(message: str) -> None:
    print(f"{PREFIX} {message}")


class WelcomePage:
    def __init__(self, page: Page) -> None:
        self.page = page
        self.heading = page.locator("h1")
        self.sub_heading = page.locator("div.jumbotron.container p")
        self.from_city_select = page.locator('select[name="fromPort"]')
        self.to_city_select = page.locator('select[name="toPort"]')
        self.find_flights_button = page.get_by_role("button", name="Find Flights")
        self.destination_of_week_link = page.get_by_role("link", name=re.compile("destination of the week", re.IGNORECASE))

    def goto(self) -> None:
        self.page.goto("https://blazedemo.com/")

    def assert_on_welcome_page(self) -> None:
        expect(self.heading).to_have_text("Welcome to the Simple Travel Agency!")

    def select_route(self, from_city: str, to_city: str) -> None:
        self.from_city_select.select_option(from_city)
        self.to_city_select.select_option(to_city)

    def search_flights(self) -> None:
        self.find_flights_button.click()

    def get_departure_options(self) -> list[str]:
        return self.from_city_select.locator("option").all_text_contents()

    def get_destination_options(self) -> list[str]:
        return self.to_city_select.locator("option").all_text_contents()

    def click_destination_of_the_week(self) -> None:
        self.destination_of_week_link.click()


def test_should_display_core_welcome_ui_elements(page: Page) -> None:
    welcome_page = WelcomePage(page)

    log_step("Navigating to welcome page")
    welcome_page.goto()
    log_step("Asserting welcome page hero and inputs are visible")
    welcome_page.assert_on_welcome_page()

    expect(welcome_page.sub_heading).to_be_visible()
    expect(welcome_page.from_city_select).to_be_visible()
    expect(welcome_page.to_city_select).to_be_visible()
    expect(welcome_page.find_flights_button).to_be_visible()
    expect(welcome_page.destination_of_week_link).to_be_visible()


def test_should_list_all_expected_departure_and_destination_cities(page: Page) -> None:
    welcome_page = WelcomePage(page)

    log_step("Opening welcome page to verify city lists")
    welcome_page.goto()

    expected_from_cities = [
        "Paris",
        "Philadelphia",
        "Boston",
        "Portland",
        "San Diego",
        "Mexico City",
        "Sao Paolo",
    ]

    expected_to_cities = [
        "Buenos Aires",
        "Rome",
        "London",
        "Berlin",
        "New York",
        "Dublin",
        "Cairo",
    ]

    log_step("Collecting departure and destination options from dropdowns")
    from_options = welcome_page.get_departure_options()
    to_options = welcome_page.get_destination_options()

    assert len(from_options) == len(expected_from_cities)
    assert len(to_options) == len(expected_to_cities)
    assert from_options == expected_from_cities
    assert to_options == expected_to_cities


def test_should_allow_user_to_search_flights_from_boston_to_london(page: Page) -> None:
    welcome_page = WelcomePage(page)

    log_step("Navigating to welcome page before searching flights")
    welcome_page.goto()
    log_step("Selecting route Boston -> London and submitting search")
    welcome_page.select_route("Boston", "London")
    welcome_page.search_flights()

    expect(page).to_have_url(re.compile(r"/reserve\.php"))
    results_heading = page.locator("h3")
    expect(results_heading).to_contain_text("Flights from Boston to London")


def test_destination_of_the_week_link_should_navigate_to_a_details_page(page: Page) -> None:
    welcome_page = WelcomePage(page)

    log_step("Navigating to welcome page to follow destination of the week link")
    welcome_page.goto()

    old_url = page.url
    log_step("Clicking destination of the week link and verifying navigation")
    welcome_page.click_destination_of_the_week()

    expect(page).not_to_have_url(old_url)
    expect(page).not_to_have_url("about:blank")
