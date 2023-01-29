from time import sleep
from mfrc522 import SimpleMFRC522

class RFID:
    """Wrapper class for the MFRC522 RFID reader module"""
    
    def __init__(self) -> None:
        self.reader = SimpleMFRC522()

    def read(self) -> tuple:
        """Read the RFID card and return the ID and Data (wrapper function)"""
        try:
            print("Place a card on the reader:")
            id, data = self.reader.read()
        except KeyboardInterrupt:
            print("Keyboard Interrupt.")
            raise KeyboardInterrupt
        except:
            print("WARNING: RFID Read Error.")
            return None, None
        return id, data

    def write(self, data) -> None:
        """Write data to the RFID card (wrapper function)"""
        try:
            print("Place a card on the reader to be written to:")
            self.reader.write(data)
        except:
            print("WARNING: RFID Write Error.")

    def test(self) -> None:
        """Test the RFID reader"""
        
        print("### RFID Test ###")
        print("Reading 3 times.")
        for i in range(3):
            print(f"Reading #{i + 1}:")
            id, data = self.read()
            print("ID: ", id)
            print("Data: ", data)
            sleep(2)
        print("### RFID Test Complete ###")
