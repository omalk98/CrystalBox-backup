from time import sleep
from peripherals import Buzzer, LED

class Effects:
    
    def __init__(self, buzzer, led) -> None:
        self.buzzer = Buzzer(buzzer)
        self.led = LED(led)

    # Turn off the buzzer and LED
    def off(self) -> None:
        self.led.off()
        self.buzzer.off()
    
    # Set the LED and buzzer to their success mode
    def successMode(self) -> None:
        self.led.success()
        self.buzzer.success()

    # Set the LED and buzzer to their failure mode
    def failureMode(self) -> None:
        self.led.failure()
        self.buzzer.failure()
    
    # Set the LED and buzzer to their standby mode
    def standbyMode(self) -> None:
        self.led.standby()
        self.buzzer.off()

    # Set the LED and buzzer to their processing mode
    def processingMode(self) -> None:
        self.led.processing()
        self.buzzer.off()

    # Play a success sound and light the LED green
    def success(self) -> None:
        self.successMode()
        sleep(0.05)
        self.off()
        sleep(0.05)
        self.successMode()
        sleep(0.1)
        self.off()

    # Play a failure sound and light the LED red
    def failure(self) -> None:
        self.failureMode()
        sleep(0.2)
        self.off()
        sleep(0.01)
        self.failureMode()
        sleep(0.2)
        self.off()
