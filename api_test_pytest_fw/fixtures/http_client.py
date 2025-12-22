import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

class HttpClient:
    def __init__(self, 
                 address: str,
                 protocol: str = "http",
                 keycloak_base_url: str = None,
                 keycloak_realm: str = None,
                 client_id: str = None,
                 client_secret: str = None,
                 retries: int = 3,
                 backoff_factor: float = 0.3):
        self.address = address
        self.protocol = protocol
        self.keycloak_base_url = keycloak_base_url
        self.keycloak_realm = keycloak_realm
        self.client_id = client_id
        self.client_secret = client_secret
        self.retry_count = retries
        self.backoff_factor = backoff_factor

        # Initialize the session
        self.session = requests.Session()

        # Define retry strategy
        retry_strategy = Retry(
            total=retries,
            status_forcelist=[429, 502, 503, 504],
            allowed_methods=["GET", "POST", "PUT", "DELETE"],
            backoff_factor=backoff_factor,
        )

        # Apply to both HTTP and HTTPS
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

        # Define the base URL
        self.base_url = f"{self.protocol}://{self.address}"

    def _add_default_kwargs(self, kwargs):
        # Start from caller-provided headers (if any)
        user_headers = dict(kwargs.pop("headers", {}) or {})

        # Set authorization.
        #kwargs.setdefault("headers", {})

        if self.auth_token:
            user_headers.setdefault("Authorization", f"{self.auth_token}")
                    
        # Merge user headers with default headers
        kwargs["Headers"] = user_headers
        print ("user_headers", user_headers)
        print ("kwargs", kwargs)
        return user_headers
    
    @property
    def auth_token(self):
        return f"Bearer {self.get_keycloak_token()}"
    
    def get_keycloak_token(self):
        if not all([self.keycloak_base_url, self.keycloak_realm, self.client_id, self.client_secret]):
            raise ValueError("Keycloak configuration is incomplete.")

        token_url = f"{self.keycloak_base_url}/realms/{self.keycloak_realm}/protocol/openid-connect/token"
        payload = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        print("Post Payload:",payload)
        print("Post URL:",token_url)
        print("Post Headers:",headers)
        response = self.session.post(token_url, data=payload, headers=headers)
        response.raise_for_status()
        token_data = response.json()
        return token_data.get("access_token")

    def _get(self, endpoint, **kwargs):
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = self.session.get(url, **kwargs)
        response.raise_for_status()
        return response

    def _postWithoutExceptionHandling(self, endpoint, data=None, json=None, **kwargs):
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        kwargs = self._add_default_kwargs(kwargs)
        print("Post Payload:",json)
        print("Post URL:",url)
        print("Post Headers:",kwargs)
        response = self.session.post(url, data=json, headers=kwargs)
        return response
    
    
  
    

    
