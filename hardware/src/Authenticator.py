from requests import request, get, post, put, delete


class Authenticator:
    """Handles communication with the server"""

    base_url: str = None
    gateway_id = None

    def __init__(self, gateway_id: str, base_url: str = None) -> None:
        if not Authenticator.gateway_id:
            Authenticator.gateway_id = gateway_id
        if not Authenticator.base_url:
            Authenticator.base_url = base_url

    def fetch(self, method, url, data=None):
        try:
            response = request(method, f"{Authenticator.base_url}{url}", data=data, headers={
                               "gateway_id": self.gateway_id})
            return response
        except Exception:
            print("WARNING: Failed to connect to server.")
            return None

    def validateTagAccess(self, key: str, uuid: str) -> bool:
        """Validate an RFID tag's access permissions"""
        url = f"/access/{key}/{uuid}"
        response = self.fetch('get', url)
        if not response or response.status_code != 200:
            print("WARNING: Tag does not have appropriate access permissions.")
            return False
        return True

    def getUserInfoFromTag(self, key: str, uuid: str) -> dict:
        """Get a User's information from the server"""
        url = f"/user-info/{key}/{uuid}"
        response = self.fetch("get", url)
        if not response or response.status_code != 200:
            print("WARNING: Failed to get user info.")
            return None
        user_info = response.json()
        return user_info

    def getUserInfoFromEmailOrUsername(self, username: str) -> dict:
        """Get a User's information from the server"""
        url = f"/user-info/{username}"
        response = self.fetch("get", url)
        if not response or response.status_code != 200:
            print("WARNING: Failed to get user info.")
            return None
        user_info = response.json()
        return user_info

    def createUserTag(self, user_id: str, key: str) -> str:
        """Create a new User tag and return the new UUID"""
        url = f"/create-tag/{user_id}/{key}"
        response = self.fetch('post', url)
        if not response or response.status_code != 201:
            print("WARNING: Failed to create tag.")
            return None
        new_uuid = response.json()["new_uuid"]
        return new_uuid

    def replaceUserTag(self, user_id: str, new_key: str) -> str:
        """Replace a User's RFID tag with a new one and return the new UUID"""
        url = f"/replace-tag/{user_id}/{new_key}"
        response = self.fetch('put', url)
        if not response or response.status_code != 201:
            print("WARNING: Failed to replace tag.")
            return None
        new_uuid = response.json()["new_uuid"]
        return new_uuid

    def removeUserTag(self, key: str) -> bool:
        """Remove a User's RFID tag"""
        url = f"/remove-tag/{key}"
        response = self.fetch('delete', url)
        if not response or response.status_code != 202:
            print("WARNING: Failed to remove tag.")
            return False
        return True

    def removeAllUserTags(self, uid: str) -> bool:
        """Remove a User's full RFID tag list"""
        url = f"/remove-all-tags/{uid}"
        response = self.fetch('delete', url)
        if not response or response.status_code != 202:
            print("WARNING: Failed to remove tags.")
            return False
        return True
