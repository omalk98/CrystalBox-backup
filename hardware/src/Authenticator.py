from urllib.request import urlopen
import json

class Authenticator:

    base_url = "http://localhost:5555/api/v1/gateway"

    def __init__(self, gate_id) -> None:
        self.gate_id = gate_id

    def validateKeyAccess(self, key, uuid) -> bool:
        url = f"{self.base_url}/access/{self.gate_id}/{key}/{uuid}"
        response = urlopen(url)
        if response.getcode() != 200:
            return False
        return True
