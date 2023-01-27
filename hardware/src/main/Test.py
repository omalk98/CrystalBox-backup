from time import sleep
from simple_term_menu import TerminalMenu
from .Mode import Mode
from peripherals import Buzzer, LED, RFID, Effects

class Test(Mode):
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
        frequencies = [220.0, 440.0, 880.0]
        colors = ["red", "green", "blue"]
        pitches = ['low', 'medium', 'high']
        print("Reading 3 times.")
        for i in range(3):
            self.led.color(colors[i])
            print(f"Reading #{i + 1}:")
            id, data = self.read()
            print("ID: ", id)
            print("Data: ", data)
            self.effects.flashAndSound(colors[i], frequencies[i])
            print(f"Did you hear a {pitches[i]} pitch?") 
            print("Did you see a {colors[i]} LED flash?")
            
        print("### ALL Components Test Complete ###")


    def run(self, **kwargs: dict) -> None:
        """Run the test menu and loop"""

        menu_items = [
            "[1] Buzzer Test", 
            "[2] LED Test", 
            "[3] Buzzer and LED Test",
            "[4] RFID Test",
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
