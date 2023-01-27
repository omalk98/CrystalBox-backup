from urllib.request import urlopen
import json

class Authenticator:

    base_url: str = None

    def __init__(self, gate_id: str, base_url: str) -> None:
        self.gate_id = gate_id
        self.base_url = base_url

    def fetch(self, url: str):
        """Fetch a URL from the server using base_url"""
        try:
            response = urlopen(f"{self.base_url}{url}")
            return response
        except:
            print("WARNING: Could NOT Connect to Server.")
            return None

    def validateTagAccess(self, key: str, uuid: str) -> bool:
        """Validate an RFID tag's access permissions"""
        url = f"/access/{self.gate_id}/{key}/{uuid}"
        response = self.fetch(url)
        if response == None or response.getcode() != 200:
            print("WARNING: Tag does not have appropriate access permissions.")
            return False
        return True
    
    def replaceTag(self, user_id: str, new_key: str) -> str:
        """Replace a User's RFID tag with a new one"""
        url = f"/replace/{self.gate_id}/{user_id}/{new_key}"
        response = self.fetch(url)
        if response == None or response.getcode() != 200:
            print("WARNING: Failed to replace tag.")
            return None
        new_uuid = json.loads(response.read().decode("utf-8"))["new_uuid"]
        return new_uuid

    