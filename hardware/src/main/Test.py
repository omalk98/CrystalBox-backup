from simple_term_menu import TerminalMenu
from Setup import Setup
from peripherals import Buzzer, LED, RFID, Effects

class Test(Setup):
    """Handles the Test menu and Test functions"""

    def __init__(self, buzzer: int, led: list) -> None:
        super().__init__()
        self.buzzer = Buzzer(buzzer)
        self.led = LED(led)
        self.rfid = RFID()
        self.effects = Effects.fromObjects(self.buzzer, self.led)

    def testAll(self) -> None:
        """Test all peripheral components"""
        print("### Test ALL Components ###")

    def run(self, **kwargs: dict) -> None:
        """Run the test menu and loop"""

        menu_items = [
            "[1] Buzzer Test", 
            "[2] LED Test", 
            "[4] Buzzer and LED Test",
            "[3] RFID Test",
            "[5] Test ALL",
            "[6] or q to Exit"
        ]
        while True:
            selection = TerminalMenu(menu_items, title="Test Menu").show()
            if selection == 0:
                self.buzzer.test()
            elif selection == 1:
                self.led.test()
            elif selection == 2:
                self.effects.test()
            elif selection == 3:
                self.rfid.test()
            elif selection == 4:
                self.testAll()
            else:
                return

    def __del__(self):
        super().__del__()
