from simple_term_menu import TerminalMenu
from Authenticator import Authenticator
from peripherals import RFID, Effects

class Admin:
    """Handles the Admin menu and Admin functions"""

    def __init__(self, effects: Effects, rfid: RFID, auth: Authenticator) -> None:
        self.effects: Effects = effects
        self.rfid: RFID = rfid
        self.auth: Authenticator = auth

    def run(self, **kwargs: dict) -> None:
        """Run the admin menu"""
        
        menu_items = [
            "[1] Get User Info From Tag", 
            "[2] Create New User Tag", 
            "[3] Replace User Tag",
            "[4] Remove User Tag"
            "[4] or q to Exit"
        ]
        while True:
            selection = TerminalMenu(menu_items, title="Admin Menu").show()
            if selection == 0:
                print("Get User Info From Tag")
            elif selection == 1:
                print("Create New User Tag")
            elif selection == 2:
                print("Replace User Tag")
            else:
                return
