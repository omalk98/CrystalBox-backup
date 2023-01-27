#from RPi.GPIO import setwarnings, cleanup
from simple_term_menu import TerminalMenu
from Globals import BUZZER_PIN, LED_PINS, GATEWAY_ID, BASE_URL

# Loop wrapper
def loop(name, function, *args) -> None:
    try:
        print(f"### Starting {name} Loop ###")
        while True:
            function(*args)
    except KeyboardInterrupt:
        print(f"### Exiting {name} Loop ###")
        #cleanup()

# Testing function
def test(*args) -> None:
    pass

# Admin Panel function
def admin(*args) -> None:
    pass

# Reader function, listens for RFID tags
def reader(*args) -> None:
    pass

def main() -> None:
    try:
        while True:
            #setwarnings(False)
            menu_items = ["[t] Test", "[a] Admin", "[r] Reader"]
            menu = TerminalMenu(menu_items, title="Main Menu")
            index = menu.show()
            if index == 0:
                loop("TEST", test, "Hello", "World")
            elif index == 1:
                loop("ADMIN", admin)
            elif index == 2:
                loop("READER", reader)
            else:
                break
    except KeyboardInterrupt:
        print("Exiting Program")
    finally:
        #cleanup()
        pass

# Run main() if this file is executed
if __name__ == "__main__":
    main()
