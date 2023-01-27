from Setup import Setup
from Authenticator import Authenticator
from peripherals import RFID, Effects

class Admin(Setup):
    """Handles the Admin menu and Admin functions"""

    def __init__(self, buzzer: int, led: list, gate_id: str, base_url: str) -> None:
        super().__init__()
        self.effects = Effects(buzzer, led)
        self.rfid = RFID()
        self.auth = Authenticator(gate_id, base_url)

    def run(self, **kwargs: dict) -> None:
        """Run the admin menu"""
        print("Admin running")

    def __del__(self) -> None:
        super().__del__()
