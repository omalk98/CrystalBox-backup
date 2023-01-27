from time import sleep
from .Mode import Mode
from Authenticator import Authenticator
from peripherals import RFID, Effects

class Reader(Mode):
    """Handles Reader loop and access validation"""
    
    def __init__(self, buzzer: int, led: list, gate_id: str, base_url: str) -> None:
            super().__init__()
            self.effects = Effects(buzzer, led)
            self.rfid = RFID()
            self.auth = Authenticator(gate_id, base_url)

    def accessDenied(self) -> None:
        """Play a failure sound and light the LED red, then wait 2 seconds"""
        self.effects.failure()
        self.effects.failureMode()
        sleep(2)
    
    def accessGranted(self) -> None:
        """Play a success sound and light the LED green, then wait 5 seconds"""
        self.effects.success()
        self.effects.successMode()
        sleep(5)

    def run(self, **kwargs: dict) -> None:
        """Run the reader loop, Reads RFID tags and validates access"""
        while True:
            self.effects.standbyMode()
            key, uuid = RFID.read()

            self.effects.processingMode()
            if not key or not uuid:
                self.accessDenied()
                return
                
            access_granted = self.auth.validateTagAccess(key, uuid)
            if access_granted:
                self.accessGranted()
            else:
                self.accessDenied()

    def __del__(self) -> None:
        super().__del__()
