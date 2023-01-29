from sys import argv
from traceback import print_exc
from simple_term_menu import TerminalMenu
from Globals import BUZZER_PIN, LED_PINS, GATEWAY_ID, BASE_URL
from main import Test, Admin, Reader
from Authenticator import Authenticator
from peripherals import RFID, Effects, Buzzer, LED

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
        "reader":   False,
        "c":        False,
        "change":   False
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

def loop(name, module: object, **kwargs: dict) -> None:
    """Loop wrapper with keyboard interrupt handling"""
    try:
        print(f"### Starting {name} Loop ###")
        module.run(**kwargs)
    except KeyboardInterrupt:
        print(f"### Exiting {name} Loop ###")
    except Exception:
        print(f"WARNING: Error in {name} Loop")
        print_exc()

def helpMessage() -> None:
    """Print help message"""
    print("### Gate Access Control Help ###\n")
    print("Q - Quit, CTRL+C - Exit Loop or Program")
    print("### Arguments ###")
    print("--help,   -h : Show this help message")
    print("--test,   -t : Start in TEST mode")
    print("--admin,  -a : Start in ADMIN mode")
    print("--reader, -r : Start in READER mode")

def startupMessage() -> None:
    """Print startup message"""
    print("\n##########################################")
    print("### Welcome to the Gate Access Control ###\n") 
    print("##########################################")
    print("Q - Quit, CTRL+C - Exit Loop or Program")
    print("Please select a mode to continue:\n")

def clearStartupArgs(args) -> None:
    """Clears startup arguments"""
    args["t"] = False
    args["test"] = False
    args["a"] = False
    args["admin"] = False
    args["r"] = False
    args["reader"] = False
    args["c"] = False
    args["change"] = False

def changeGatewayID() -> None:
    """Change the gateway ID"""
    print("### Change Gateway ID ###")
    menu_items = [
        "[1] OMALK98",
        "[2] SDTHK96",
        "[3] PHILI95"
    ]
    selection = TerminalMenu(menu_items, title="Select Gateway ID").show()
    if selection == 0:
        Authenticator.setGatewayId("OMALK98")
    elif selection == 1:
        Authenticator.setGatewayId("SDTHK96")
    elif selection == 2:
        Authenticator.setGatewayId("PHILI95")



def main() -> None:
    """Main function, starts up with a menu to select which loop to run"""
    try:
        args = processArgs()

        if args["h"] == True or args["help"] == True:
            helpMessage()
            return
        
        # Setup Stage
        buzzer  = Buzzer(BUZZER_PIN)
        led     = LED(LED_PINS)
        effects = Effects(buzzer, led)
        rfid    = RFID()
        auth    = Authenticator(GATEWAY_ID, BASE_URL)
        menu_items = [
            "[t] Test", 
            "[a] Admin", 
            "[r] Reader",
            "[c] Change Gateway ID",
            "[q] Quit"
        ]

        # Main Loop
        while True:
            startupMessage()
            selection: int = None
            
            if args["t"] == True or args["test"] == True:
                selection = 0
            elif args["a"] == True or args["admin"] == True:
                selection = 1
            elif args["r"] == True or args["reader"] == True:
                selection = 2
            elif args["c"] == True or args["change"] == True:
                selection = 3
            else:
                selection = TerminalMenu(menu_items, title="Main Menu").show()
            clearStartupArgs(args)
            
            if selection == 0:
                loop("TEST", Test(buzzer, led, rfid, effects))
            elif selection == 1:
                loop("ADMIN", Admin(effects, rfid, auth))
            elif selection == 2:
                loop("READER", Reader(effects, rfid, auth))
            elif selection == 3:
                changeGatewayID()
            else:
                break
    except KeyboardInterrupt:
        print("Keyboard Interrupt")
    except Exception:
        print("WARNING: Error in Main")
        print_exc()
    finally:
        print("Exiting Program")

# Run main() if this file is executed
if __name__ == "__main__":
    main()
