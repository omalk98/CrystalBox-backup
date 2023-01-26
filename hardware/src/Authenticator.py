from urllib.request import urlopen
import json

class Authenticator:

    base_url = "http://localhost:5555/api/v1/gateway"

    def __init__(self, gate_id) -> None:
        self.gate_id = gate_id

    def fetch(self, url):
        try:
            response = urlopen(f"{self.base_url}{url}")
            return response
        except:
            print("WARNING: Could NOT Connect to Server.")
            return None

    def validateKeyAccess(self, key, uuid) -> bool:
        url = f"/access/{self.gate_id}/{key}/{uuid}"
        response = self.fetch(url)
        if response == None or response.getcode() != 200:
            return False
        return True
