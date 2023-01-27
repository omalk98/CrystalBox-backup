from time import sleep
from peripherals import Buzzer, LED

class Effects:
    
    def __init__(self, buzzer: int, led: list) -> None:
        self.buzzer = Buzzer(buzzer)
        self.led = LED(led)

    @classmethod
    def fromObjects(cls, buzzer: Buzzer, led: LED) -> None:
        """Create an instance of this class from Buzzer and LED objects"""
        cls.buzzer = buzzer
        cls.led = led
        return cls

    def off(self) -> None:
        """Turn off the buzzer and LED"""
        self.led.off()
        self.buzzer.off()
    
    def successMode(self) -> None:
        """Set the LED (green) and buzzer (high pitch) to their success mode"""
        self.led.success()
        self.buzzer.success()

    def failureMode(self) -> None:
        """Set the LED (red) and buzzer (low pitch) to their failure mode"""
        self.led.failure()
        self.buzzer.failure()
    
    def standbyMode(self) -> None:
        """Set the LED (blue) and buzzer (off) to their standby mode"""
        self.led.standby()
        self.buzzer.off()

    def processingMode(self) -> None:
        """Set the LED (yellow) and buzzer (off) to their processing mode"""
        self.led.processing()
        self.buzzer.off()

    def success(self) -> None:
        """Play a success sound and light the LED green"""
        self.successMode()
        sleep(0.05)
        self.off()
        sleep(0.05)
        self.successMode()
        sleep(0.1)
        self.off()

    def failure(self) -> None:
        """Play a failure sound and light the LED red"""
        self.failureMode()
        sleep(0.2)
        self.off()
        sleep(0.01)
        self.failureMode()
        sleep(0.2)
        self.off()

    def test(self) -> None:
        """Test the buzzer and LED"""
        print("### Effects Test ###")
        for i in range(3):
            print(f"#{i + 1}:")
            print("Can you hear a rising tone?")
            print("Did the LED turn from Red to Green to Blue to Yellow?")
            self.failure()
            sleep(0.3)
            self.led.success()
            self.buzzer.play(440.0)
            sleep(0.3)
            self.led.standby()
            self.buzzer.success()
            sleep(0.3)
            self.processing()
            sleep(1)
        self.off()
        print("### Effects Test Complete ###")
