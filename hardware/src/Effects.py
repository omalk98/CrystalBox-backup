from time import sleep
from peripherals import Buzzer, LED

class Effects:
    
    def __init__(self, buzzer, led) -> None:
        self.buzzer = Buzzer(buzzer)
        self.led = LED(led)

    def off(self) -> None:
        self.led.off()
        self.buzzer.off()
    
    def success_on(self) -> None:
        self.led.success()
        self.buzzer.success()

    def failure_on(self) -> None:
        self.led.failure()
        self.buzzer.failure()

    # Play a success sound and light the LED green
    def success(self) -> None:
        self.success_on()
        sleep(0.05)
        self.off()
        sleep(0.05)
        self.success_on()
        sleep(0.1)
        self.off()

    # Play a failure sound and light the LED red
    def failure(self) -> None:
        self.failure_on()
        sleep(0.2)
        self.off()
        sleep(0.01)
        self.failure_on()
        sleep(0.2)
        self.off()
