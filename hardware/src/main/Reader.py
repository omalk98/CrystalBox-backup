from time import sleep
from Authenticator import Authenticator
from peripherals import RFID, Effects

class Reader:
    """Handles Reader loop and access validation"""
    
    def __init__(self, effects: Effects, rfid: RFID, auth: Authenticator) -> None:
        self.effects: Effects = effects
        self.rfid: RFID = rfid
        self.auth: Authenticator = auth

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
            try:
                self.effects.standbyMode()
                key, uuid = self.rfid.read()

                self.effects.processingMode()
                print("processing...\n")
                if not key or not uuid:
                    self.accessDenied()
                    continue

                access_granted = self.auth.validateTagAccess(key, uuid)
                if access_granted:
                    self.accessGranted()
                else:
                    self.accessDenied()
            except KeyboardInterrupt:
                self.effects.off()
                raise KeyboardInterrupt
