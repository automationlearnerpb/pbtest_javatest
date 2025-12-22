import pytest
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fixtures.http_client import HttpClient
from fixtures.models import SUPER_SIMPLE_MODEL,AUTO_MAIN_MODEL_FOR_LOAD,SIMPLE_MODEL
from fixtures.pgsql_client import PgClient

BASE_URL_ADDRESS = "localhost:8000" 
PROTOCOL = "http"
KEYCLOAK_BASE_URL = "http://localhost:8000/auth/"
KEYCLOAK_REALM = "eggplant" # Replace with actual DAI application URL
ADMIN_USERNAME = "admin@eggplant.io"
ADMIN_PASSWORD = "wibblewobble"
KEYCLOAK_CLIENT_ID = "client:dai:api:integration:dace8a54-50cb-437e-aa8d-a1a843036a77"
KEYCLOAK_CLIENT_SECRET = "HBE1TU0HdzLSrAwn0Tpk7PD17IX6BhGp"
KEYCLOAK_USER_CLIENT_ID = "test"
KEYCLOAK_USER_CLIENT_SECRET = "HBE1TU0HdzLSrAwn0Tpk7PD17IX6BhGp"
PG_CLIENT_HOST = "localhost"
PG_CLIENT_PORT = 5433
PG_CLIENT_USER = "postgres"
PG_CLIENT_PASSWORD = "password"
PG_CLIENT_DB = "ttdb"
PG_CONNECTION_TIMEOUT = 10
MODELS_USED = {
                "AUTO_MAIN_MODEL_FOR_LOAD":AUTO_MAIN_MODEL_FOR_LOAD,
                "AUTO_MODEL_JSON_INVALID":AUTO_MAIN_MODEL_FOR_LOAD,
                "SUPER_SIMPLE_MODEL":SUPER_SIMPLE_MODEL,
                "SIMPLE_MODEL":SIMPLE_MODEL,
                "MISSING_DATA":{}
            }

@pytest.fixture()
def browser():
    chrome_options = Options()
    # Add any desired Chrome options here
    # chrome_options.add_argument('--headless')  # Uncomment to run in headless mode
    
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    
    yield driver
    
    # Teardown - close browser after test
    driver.quit()

@pytest.fixture()
def base_url():
    return BASE_URL

@pytest.fixture()
def username():
    return ADMIN_USERNAME

@pytest.fixture()
def password():
    return ADMIN_PASSWORD

@pytest.fixture()
def keycloak_auth_token_url():
    auth_token_url = KEYCLOAK_BASE_URL + "realms/" + KEYCLOAK_REALM + "/protocol/openid-connect/token"
    return auth_token_url

@pytest.fixture()
def client_id():
    return KEYCLOAK_CLIENT_ID

@pytest.fixture()
def client_secret():
    return KEYCLOAK_CLIENT_SECRET

@pytest.fixture()
def http_client():
    
    client = HttpClient(
        address=BASE_URL_ADDRESS,
        protocol=PROTOCOL,
        keycloak_base_url=KEYCLOAK_BASE_URL,
        keycloak_realm=KEYCLOAK_REALM,
        client_id=KEYCLOAK_CLIENT_ID,
        client_secret=KEYCLOAK_CLIENT_SECRET,
        #client_id=KEYCLOAK_USER_CLIENT_ID,
        #client_secret=KEYCLOAK_USER_CLIENT_SECRET,
        retries=3,
        backoff_factor=0.3
    )
    return client

@pytest.fixture()
def model_json(request):
    model_key = getattr(request, "param", None)
    if model_key and model_key in MODELS_USED:
        return json.dumps(MODELS_USED[model_key])    
    else:
        return None   
    


@pytest.fixture(scope="session")
def pg_client(request):
    """
       Session-scoped fixture that yields a connected PgClient configured from env vars:
       PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB
    """
    host = PG_CLIENT_HOST
    port = int(PG_CLIENT_PORT)
    user = PG_CLIENT_USER
    password = PG_CLIENT_PASSWORD
    db = getattr(request, "param", PG_CLIENT_DB)

    client = PgClient(host=host, port=port, user=user, password=password, dbname=db)
    client.connect()
    yield client
    client.close()


