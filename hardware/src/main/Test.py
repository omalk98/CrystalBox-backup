from time import sleep
from simple_term_menu import TerminalMenu
from .Mode import Mode
from peripherals import Buzzer, LED, RFID, Effects

class Test(Mode):
    """Handles the Test menu and Test functions"""

    buzzer: Buzzer = None
    led: LED = None
    rfid: RFID = None
    effects: Effects = None

    def __init__(self, buzzer: int, led: list) -> None:
        super().__init__()
        if Test.buzzer == None:
            Test.buzzer = Buzzer(buzzer)
        if Test.led == None:
            Test.led = LED(led)
        if Test.rfid == None:
            Test.rfid = RFID()
        Test.effects = Effects.fromObjects(Test.buzzer, Test.led)

    def testAll(self) -> None:
        """Test all peripheral components"""
        
        print("### Test ALL Components ###")
        frequencies = [220.0, 440.0, 880.0]
        colors = ["red", "green", "blue"]
        pitches = ['low', 'medium', 'high']
        print("Reading 3 times.")
        for i in range(3):
            Test.led.color(colors[i])
            print(f"Reading #{i + 1}:")
            id, data = Test.rfid.read()
            print("ID: ", id)
            print("Data: ", data)
            Test.effects.flashAndSound(Test.effects, colors[i], frequencies[i])
            print(f"Did you hear a {pitches[i]} pitch?") 
            print(f"Did you see a {colors[i]} LED flash?")
            
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
                Test.buzzer.test()
            elif selection == 1:
                Test.led.test()
            elif selection == 2:
                Test.effects.test(Test.effects)
            elif selection == 3:
                Test.rfid.test()
            elif selection == 4:
                self.testAll()
            else:
                return

    def __del__(self):
        super().__del__()
        Test.buzzer = None
        Test.led = None
        Test.rfid = None
        Test.effects = None
