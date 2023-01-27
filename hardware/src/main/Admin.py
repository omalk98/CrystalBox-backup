from simple_term_menu import TerminalMenu
from .Mode import Mode
from Authenticator import Authenticator
from peripherals import RFID, Effects

class Admin(Mode):
    """Handles the Admin menu and Admin functions"""

    effects: Effects = None
    rfid: RFID = None
    auth: Authenticator = None

    def __init__(self, buzzer: int, led: list, gate_id: str, base_url: str) -> None:
        super().__init__()
        Admin.effects = Effects(buzzer, led)
        Admin.rfid = RFID()
        Admin.auth = Authenticator(gate_id, base_url)

    def run(self, **kwargs: dict) -> None:
        """Run the admin menu"""
        
        menu_items = [
            "[1] Get User Info From Tag", 
            "[2] Create New User Tag", 
            "[3] Replace User Tag",
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

    def __del__(self) -> None:
        super().__del__()
