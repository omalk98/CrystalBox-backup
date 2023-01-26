from time import sleep
from peripherals import Buzzer, LED

class Effects:
    
    def __init__(self, buzzer, led) -> None:
        self.buzzer = Buzzer(buzzer)
        self.led = LED(led)

    # Play a success sound and light the LED green
    def success(self) -> None:
        self.led.success()
        self.buzzer.success()
        sleep(0.05)
        self.led.off()
        self.buzzer.off()
        sleep(0.05)
        self.led.success()
        self.buzzer.success()
        sleep(0.1)
        self.led.off()
        self.buzzer.off()

    # Play a failure sound and light the LED red
    def failure(self) -> None:
        self.led.failure()
        self.buzzer.failure()
        sleep(0.2)
        self.led.off()
        self.buzzer.off()
        sleep(0.01)
        self.led.failure()
        self.buzzer.failure()
        sleep(0.2)
        self.led.off()
        self.buzzer.off()
