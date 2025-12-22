import pytest

MODEL_ID = "6ed14d8e-e5b8-4dcb-a40c-fb8916ecf8ed"
DATE_CREATED = "2025-11-05 09:07:06"

#This is the first version of test where by the token in generated using client credentials grant type. This can be further optimized to include
#http session through a fixture.
@pytest.mark.sanity
def test_dai_valid_client_api_token(http_client):
    # Get Keycloak token using client credentials
    token_response = http_client.get_keycloak_token()
    assert token_response is not None, "Failed to obtain Keycloak token"

#parametized test to import model using http_client fixture and model_json fixture
#the parameter passed indicates the value should be passed to fixture and not to test directly.
@pytest.mark.importModel
@pytest.mark.sanity
@pytest.mark.parametrize("model_json", ["SIMPLE_MODEL"], indirect=True)
def test_dai_import_model(http_client, model_json):
    import_response = http_client._postWithoutExceptionHandling("/modeler_service/api/v2/models", json=model_json, headers={"Accept": "application/json", "Content-Type": "application/json"})
    data=import_response.json()
    assert import_response.status_code == 201, f"Model import failed with status code {import_response.status_code}"
    assert data is not None, "Import response JSON is None"
    assert data.get("id") is not None, "Imported model ID not found in response"

    if data.get("id"):
        MODEL_ID = data["id"]
        
    

@pytest.mark.importModel
@pytest.mark.parametrize("model_json", ["SIMPLE_MODEL"], indirect=True)
def test_dai_import_duplicate_model(http_client, model_json):
    import_response = http_client._postWithoutExceptionHandling("/modeler_service/api/v2/models", json=model_json, headers={"Accept": "application/json", "Content-Type": "application/json"})
    assert import_response.status_code == 409, f"Model import failed with status code {import_response.status_code}"
    print({MODEL_ID})

@pytest.mark.importModel
@pytest.mark.parametrize("model_json", ["MISSING_DATA"], indirect=True)
def test_dai_import_model_withno_data(http_client, model_json):
    import_response = http_client._postWithoutExceptionHandling("/modeler_service/api/v2/models", json=model_json, headers={"Accept": "application/json", "Content-Type": "application/json"})
    assert import_response.status_code == 400, f"Model import failed with status code {import_response.status_code}"

@pytest.mark.testDb
@pytest.mark.parametrize("pg_client", ["ttdb"], indirect=True)
def test_dai_model_is_added_to_db(http_client, model_json, pg_client):
    #db_response = pg_client.execute_query("SELECT * FROM public.modeltable WHERE modelid = %s", (MODEL_ID,))
    #db_response = pg_client.execute_query("SELECT * FROM public.modeltable")
    db_response = pg_client.execute_query("select * from public.modeltable where modelid = %s and created::DATE >= %s::DATE", (MODEL_ID, DATE_CREATED))
    print("DB Response:", db_response)
    print("DB Response:", type(db_response))

    for each in db_response:
        print("Each Row:", each['modelid'])
    


    