from time import sleep
from gpiozero import TonalBuzzer
from gpiozero.tones import Tone

class Buzzer:
    
    def __init__(self, pin):
        self.buzzer = TonalBuzzer(pin)

    # Play a success sound
    def success(self) -> None:
        self.buzzer.play(Tone(880.0))

    # Play a failure sound
    def failure(self) -> None:
        self.buzzer.play(Tone(220.0))
    
    # Turn off the buzzer (wrapper function)
    def off(self) -> None:
        self.buzzer.stop()
    
    # Play a tone at a given frequency (wrapper function)
    def play(self, frequency) -> None:
        self.buzzer.play(Tone(frequency))
    
    # Test the buzzer
    def test(self) -> None:
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
