from mfrc522 import SimpleMFRC522

class RFID:
    
    def __init__(self) -> None:
        self.reader = SimpleMFRC522()

    # Read the RFID card and return the ID and Data (wrapper function)
    def read(self) -> tuple:
        id, data = self.reader.read()
        return id, data

    # Write data to the RFID card (wrapper function)
    def write(self, data) -> None:
        self.reader.write(data)

    # Test the RFID reader
    def test(self) -> None:
        print("### RFID Test ###")
        print("Reading 3 times.")
        for i in range(3):
            print(f"Reading {i + 1} - Place a card on the reader:")
            id, data = self.reader.read()
            print("ID: ", id)
            print("Data: ", data)
        print("### RFID Test Complete ###")
