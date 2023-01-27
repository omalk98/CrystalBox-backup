from sys import argv
from RPi.GPIO import cleanup
from simple_term_menu import TerminalMenu
from Globals import BUZZER_PIN, LED_PINS, GATEWAY_ID, BASE_URL
from main import Test, Admin, Reader

def processArgs() -> dict:
    """Argument processor, returns a dictionary of arguments"""
    args: dict = {
        "h":        False,
        "help":     False,
        "t":        False,
        "test":     False,
        "a":        False,
        "admin":    False,
        "r":        False,
        "reader":   False
    }
    for arg in argv:
        if arg.startswith("--") or arg.startswith("-"):
            arg = arg[1 if arg.startswith("-") else 2:]
            if "=" in arg:
                arg = arg.split("=")
                args[arg[0]] = arg[1]
            else:
                args[arg] = True
    return args

def loop(name, module: object, *args: tuple) -> None:
    """Loop wrapper with keyboard interrupt handling"""
    try:
        print(f"### Starting {name} Loop ###")
        module.run(*args)
    except KeyboardInterrupt:
        print(f"### Exiting {name} Loop ###")
    except Exception as e:
        print(f"WARNING: Error in {name} Loop")
        print(e)

def helpMessage() -> None:
    """Print help message"""
    print("### Gate Access Control Help ###\n")
    print("Q - Quit, CTRL+C - Exit Loop or Program")
    print("### Arguments ###")
    print("--help,   -h : \tShow this help message")
    print("--test,   -t : \tStart in TEST mode")
    print("--admin,  -a : \tStart in ADMIN mode")
    print("--reader, -r : \tStart in READER mode")

def startupMessage() -> None:
    """Print startup message"""
    print("##########################################")
    print("### Welcome to the Gate Access Control ###\n")
    print("Q - Quit, CTRL+C - Exit Loop or Program")
    print("Please select a mode to continue:")
    print("##########################################")

def main() -> None:
    """Main function, starts up with a menu to select which loop to run"""
    try:
        args = processArgs()
        if args["h"] or args["help"]:
            helpMessage()
            return
        while True:
            startupMessage()
            selection: int = None
            
            if args["t"] or args["test"]:
                selection = 0
            elif args["a"] or args["admin"]:
                selection = 1
            elif args["r"] or args["reader"]:
                selection = 2
            else:
                menu_items = [
                    "[t] Test", 
                    "[a] Admin", 
                    "[r] Reader", 
                    "[q] Quit"
                ]
                selection = TerminalMenu(menu_items, title="Main Menu").show()
            
            if selection == 0:
                loop("TEST", Test(BUZZER_PIN, LED_PINS))
            elif selection == 1:
                loop("ADMIN", Admin(BUZZER_PIN, LED_PINS, GATEWAY_ID, BASE_URL))
            elif selection == 2:
                loop("READER", Reader(BUZZER_PIN, LED_PINS, GATEWAY_ID, BASE_URL))
            else:
                break
    except Exception as e:
        print("WARNING: Error in Main")
        print(e)
    finally:
        cleanup()
        print("Exiting Program")

# Run main() if this file is executed
if __name__ == "__main__":
    main()
