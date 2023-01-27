from time import sleep
from gpiozero import RGBLED
from colorzero import Color

class LED:
    
    def __init__(self, pins: list) -> None:
        self.led = RGBLED(pins[0], pins[1], pins[2])

    def color(self, color: str) -> None:
        """Set the LED to a given color (wrapper function)"""
        self.led.color = Color(color)
        
    def off(self) -> None:
        """Turn off the LED (wrapper function)"""
        self.led.off()

    def success(self) -> None:
        """Light the LED green"""
        self.color('green')

    def failure(self) -> None:
        """Light the LED red"""
        self.color('red')

    def standby(self) -> None:
        """Light the LED blue"""
        self.color('blue')

    def processing(self) -> None:
        """Light the LED yellow"""
        self.color('yellow')

    def test(self) -> None:
        """Test the LED"""
        
        print("### LED Test ###")
        print("Do you see a flashing red light?")
        self.failure()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.failure()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.failure()
        sleep(0.5)
        self.off()
        sleep(1.5)

        print("Do you see a flashing green light?")
        self.success()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.success()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.success()
        sleep(0.5)
        self.off()
        sleep(1.5)

        print("Do you see a flashing blue light?")
        self.standby()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.standby()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.standby()
        sleep(0.5)
        self.off()
        sleep(1.5)

        print("Do you see a flashing yellow light?")
        self.processing()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.processing()
        sleep(0.5)
        self.off()
        sleep(0.5)
        self.processing()
        sleep(0.5)
        self.off()
        sleep(1.5)

        print("If you did not see a light, check the wiring then try again.")
        print("If the color is not correct, change the pin numbers in \"pin_config.py\" - order is R G B - then try again.")
        print("### LED Test Complete ###")
