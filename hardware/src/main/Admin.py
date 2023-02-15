from time import sleep
from json import dumps
from simple_term_menu import TerminalMenu
from Authenticator import Authenticator
from peripherals import RFID, Effects


class Admin:
    """Handles the Admin menu and Admin functions"""

    def __init__(self, effects: Effects, rfid: RFID, auth: Authenticator) -> None:
        self.effects: Effects = effects
        self.rfid: RFID = rfid
        self.auth: Authenticator = auth

    def getUserInfoFromTag(self) -> str:
        """Get User Info From Tag and return the user id"""
        print("### Get User Info From Tag ###")
        try:
            self.effects.standbyMode()

            key, uuid = self.rfid.read()
            self.effects.processingMode()
            if not key or not uuid:
                self.effects.failure()
                raise

            user_info = self.auth.getUserInfoFromTag(key, uuid)
            if not user_info:
                print("WARNING: Failed to get user info.")
                self.effects.failure()
                return None

            print(f"{dumps(user_info, sort_keys=True, indent=4)}")
            self.effects.success()
            return user_info["security_details"]["details"]["id"]
        except Exception:
            print("WARNING: Failed to read tag.")
        finally:
            self.effects.off()

    def getUserInfoFromEmailOrUsername(self) -> str:
        """Get User Info From Email or Username and return the user id"""
        print("### Get User Info From Email or Username ###")

        user_found = False
        while not user_found:
            username = input(
                "\nEnter partially the email or username of the user: ")
            if (username.lower() == "quit" or username.lower() == "exit"):
                return None
            user_info = self.auth.getUserInfoFromEmailOrUsername(username)
            if not user_info:
                print("WARNING: User Not Found.")
            else:
                user_found = True

        user_id: str = None
        if len(user_info) > 1:
            menu_items = []
            for user in user_info:
                menu_items.append(
                    f"[{user_info.index(user)}] {user['email']} : {user['username']}")
            selection = TerminalMenu(
                menu_items, title="Select the Correct User").show()
            user_id = user_info[selection]['id']
            print(f"{dumps(user_info[selection], sort_keys=True, indent=4)}")
        else:
            user_id = user_info[0]['id']
            print(f"{dumps(user_info[0], sort_keys=True, indent=4)}")

        return user_id

    def getUserInfo(self) -> str:
        """Get User Info options, return the user id"""
        print("### Get User Info ###")
        menu_items = [
            "[1] From Tag",
            "[2] From Email or Username",
        ]
        user_id = None
        selection = TerminalMenu(menu_items).show()
        if selection == 0:
            user_id = self.getUserInfoFromTag()
        elif selection == 1:
            user_id = self.getUserInfoFromEmailOrUsername()
        else:
            return None
        return user_id

    def createNewUserTag(self) -> None:
        """Create New User Tag"""
        print("### Create New User Tag ###")
        try:
            user_id = self.getUserInfoFromEmailOrUsername()
            if not user_id:
                return

            self.effects.standbyMode()

            key, data = self.rfid.read()
            self.effects.processingMode()
            if not key:
                self.effects.failure()
                raise
            self.effects.successState()
            sleep(0.1)
            self.effects.processingMode()

            new_uuid = self.auth.createUserTag(user_id, key)
            sleep(0.4)

            if not new_uuid:
                self.effects.failure()
                raise

            self.rfid.write(new_uuid)
            self.effects.successState()
            key, data = self.rfid.read()
            sleep(0.1)

            self.effects.processingMode()
            if not data or data != new_uuid:
                self.auth.removeUserTag(key)
                self.effects.failure()
                raise
            sleep(0.4)

            print("\nSUCCESS: Tag created for the user.")
            self.effects.success()
        except KeyboardInterrupt:
            print("WARNING: Tag creation cancelled.")
        except Exception:
            print("WARNING: Failed to create tag.")
        finally:
            self.effects.off()

    def replaceUserTag(self) -> None:
        """Replace User Tag"""
        print("### Replace User Tag ###")
        try:
            user_id = self.getUserInfoFromEmailOrUsername()
            if not user_id:
                return

            self.effects.standbyMode()

            key, data = self.rfid.read()
            self.effects.processingMode()
            if not key:
                self.effects.failure()
                raise
            self.effects.successState()
            sleep(0.1)
            self.effects.processingMode()

            new_uuid = self.auth.replaceUserTag(user_id, key)
            sleep(0.4)

            if not new_uuid:
                self.effects.failure()
                raise

            self.rfid.write(new_uuid)
            self.effects.successState()
            key, data = self.rfid.read()
            sleep(0.1)

            self.effects.processingMode()
            if not data or data != new_uuid:
                self.auth.removeUserTag(key)
                self.effects.failure()
                raise
            sleep(0.4)

            print("\nSUCCESS: Tag replaced for the user.")
            self.effects.success()
        except KeyboardInterrupt:
            print("WARNING: Tag replacement cancelled.")
        except Exception:
            print("WARNING: Failed to replace tag.")
        finally:
            self.effects.off()

    def removeUserTag(self) -> None:
        """Remove User Tag"""
        print("### Remove User Tag ###")
        menu_items = [
            "[1] Remove Single Tag",
            "[2] Remove All Tags",
            "[3] or q to Exit"
        ]
        try:
            selection = TerminalMenu(menu_items).show()
            if selection == 0:
                self.effects.standbyMode()
                key, uuid = self.rfid.read()
                sleep(0.1)
                self.effects.processingMode()
                if not key or not uuid:
                    self.effects.failure()
                    raise
                result = self.auth.removeUserTag(key)
                if result:
                    print("\nSUCCESS: User key removed.")
                    self.effects.success()
                else:
                    self.effects.failure()
                    raise
            elif selection == 1:
                user_id = self.getUserInfo()
                if not user_id:
                    self.effects.failure()
                    raise
                result = self.auth.removeAllUserTags(user_id)
                if result:
                    print("\nSUCCESS: All tags removed for the user.")
                    self.effects.success()
                else:
                    self.effects.failure()
                    raise
            else:
                return
        except KeyboardInterrupt:
            print("WARNING: Tag removal cancelled.")
        except Exception:
            print("WARNING: Failed to remove tag.")
        finally:
            self.effects.off()

    def run(self, **kwargs: dict) -> None:
        """Run the admin menu"""

        menu_items = [
            "[1] Get User Info",
            "[2] Create New User Tag",
            "[3] Replace User Tag",
            "[4] Remove User Tag",
            "[5] or q to Exit"
        ]
        while True:
            try:
                selection = TerminalMenu(menu_items, title="Admin Menu").show()
                if selection == 0:
                    self.getUserInfo()
                elif selection == 1:
                    self.createNewUserTag()
                elif selection == 2:
                    self.replaceUserTag()
                elif selection == 3:
                    self.removeUserTag()
                else:
                    return
            except KeyboardInterrupt:
                self.effects.off()
                raise KeyboardInterrupt
