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
        self.led.failure()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.failure()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.failure()
        sleep(0.5)
        self.led.off()
        sleep(0.5)

        print("Do you see a flashing green light?")
        self.led.success()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.success()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.success()
        sleep(0.5)
        self.led.off()
        sleep(1.5)

        print("Do you see a flashing blue light?")
        self.led.standby()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.standby()
        sleep(0.5)
        self.led.off()
        sleep(0.5)
        self.led.standby()
        sleep(0.5)
        self.led.off()
        sleep(0.5)

        print("If you did not see a light, check the wiring and the pin numbers then try again.")
        print("If the color is not correct, change the pin numbers - order is R G B - then try again.")
        print("### LED Test Complete ###")
