from requests import get, post, put, delete

class Authenticator:
    """Handles communication with the server"""

    base_url: str = None

    def __init__(self, gate_id: str, base_url: str = None) -> None:
        self.gate_id = gate_id
        if Authenticator.base_url != None:
            Authenticator.base_url = base_url

    def validateTagAccess(self, key: str, uuid: str) -> bool:
        """Validate an RFID tag's access permissions"""
        url = f"{Authenticator.base_url}/access/{key}/{uuid}"
        try:
            response = get(url, headers=("Gate_ID", self.gate_id))
            if not response or response.status_code != 200:
                print("WARNING: Tag does not have appropriate access permissions.")
                return False
        except Exception:
            print("WARNING: Failed to connect to server.")
            return False

        return True
    
    def getUserInfo(self, key: str, uuid: str) -> dict:
        """Get a User's information from the server"""
        url = f"{Authenticator.base_url}/user-info/{key}/{uuid}"
        response = get(url, headers=("Gate_ID", self.gate_id))
        if not response or response.status_code != 200:
            print("WARNING: Failed to get user info.")
            return None
        user_info = response.json()
        return user_info

    def createUserTag(self, key: str, uuid: str) -> str:
        """Create a new User tag"""
        url = f"{Authenticator.base_url}/create-tag/{key}"
        response = post(url, headers=("Gate_ID", self.gate_id))
        if not response or response.status_code != 200:
            print("WARNING: Failed to create tag.")
            return None
        new_uuid = response.json()["new_uuid"]
        return new_uuid

    def replaceUserTag(self, user_id: str, new_key: str) -> str:
        """Replace a User's RFID tag with a new one"""
        url = f"{Authenticator.base_url}/replace-tag/{user_id}/{new_key}"
        response = put(url, headers=("Gate_ID", self.gate_id))
        if not response or response.status_code != 200:
            print("WARNING: Failed to replace tag.")
            return None
        new_uuid = response.json()["new_uuid"]
        return new_uuid

    def removeUserTag(self, user_id: str, key: str) -> bool:
        """Remove a User's RFID tag"""
        url = f"{Authenticator.base_url}/remove-tag/{user_id}/{key}"
        response = delete(url, headers=("Gate_ID", self.gate_id))
        if not response or response.status_code != 200:
            print("WARNING: Failed to remove tag.")
            return False
        return True

    