from urllib.request import urlopen
import json

class Authenticator:

    base_url = "http://localhost:5555/api/v1/gateway"

    def __init__(self, gate_id) -> None:
        self.gate_id = gate_id

    # Fetch a URL from the server using base_url
    def fetch(self, url):
        try:
            response = urlopen(f"{self.base_url}{url}")
            return response
        except:
            print("WARNING: Could NOT Connect to Server.")
            return None

    # Validate an RFID tag's access permissions
    def validateTagAccess(self, key, uuid) -> bool:
        url = f"/access/{self.gate_id}/{key}/{uuid}"
        response = self.fetch(url)
        if response == None or response.getcode() != 200:
            print("WARNING: Tag does not have appropriate access permissions.")
            return False
        return True
    
    # Replace a User's RFID tag with a new one
    def replaceTag(self, user_id, new_key) -> str:
        url = f"/replace/{self.gate_id}/{user_id}/{new_key}"
        response = self.fetch(url)
        if response == None or response.getcode() != 200:
            print("WARNING: Failed to replace tag.")
            return None
        new_uuid = json.loads(response.read().decode("utf-8"))["new_uuid"]
        return new_uuid

    