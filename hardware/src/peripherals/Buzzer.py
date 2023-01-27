from time import sleep
from gpiozero import TonalBuzzer
from gpiozero.tones import Tone

class Buzzer:
    
    def __init__(self, pin: int):
        self.buzzer = TonalBuzzer(pin)
    
    def play(self, frequency: float) -> None:
        """Play a tone at a given frequency (wrapper function)"""
        self.buzzer.play(Tone(frequency))
    
    def off(self) -> None:
        """Turn off the buzzer (wrapper function)"""
        self.buzzer.stop()

    def success(self) -> None:
        """Play a success sound"""
        self.play(880.0)

    def failure(self) -> None:
        """Play a failure sound"""
        self.play(220.0)
    
    def test(self) -> None:
        """Test the buzzer"""

        print("### Buzzer Test ###")
        print("Do you hear a high pitch beep?")
        self.success()
        sleep(0.05)
        self.off()
        sleep(0.05)
        self.success()
        sleep(0.1)
        self.off()
        sleep(1)
        print("Do you hear a low pitch beep?")
        self.failure()
        sleep(0.2)
        self.off()
        sleep(0.01)
        self.failure()
        sleep(0.2)
        self.off()
        print("If you did not hear a beep, check the wiring or change the pin number in \"pin_config.py\" then try again.")
        print("### Buzzer Test Complete ###")
