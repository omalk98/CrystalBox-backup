from time import sleep
from gpiozero import RGBLED
from colorzero import Color

class LED:
    
    def __init__(self, pin) -> None:
        self.led = RGBLED(pin[0], pin[1], pin[2])

    # Light the LED green
    def success(self) -> None:
        self.led.color = Color('green')

    # Light the LED red
    def failure(self) -> None:
        self.led.color = Color('red')

    # Light the LED blue
    def standby(self) -> None:
        self.led.color = Color('blue')

    # Light the LED yellow
    def processing(self) -> None:
        self.led.color = Color('yellow')

    # Turn off the LED (wrapper function)
    def off(self) -> None:
        self.led.off()

    # Set the LED to a given color (wrapper function)
    def color(self, color) -> None:
        self.led.color = Color(color)

    # Test the LED
    def test(self) -> None:
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
