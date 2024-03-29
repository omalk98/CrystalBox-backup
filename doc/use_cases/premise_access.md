## Premise Access (done by Soham)

### Actor (User)
An authorized and authenticated user possessing a system registered RFID chip/Mobile phone with BT functionality.

### Pre-conditions
User possesses either a RFID chip or a Bluetooth ready mobile phone (the mobile device with the app installed and is already logged into the app) or both. 

### Main Flow
1. The user taps the RFID chip or brings a mobile device close to the system (Rasp Pi).
2. The system checks whether the tapped RFID chip's UUID matches with any admin issued UUIDs stored in the database or whether the mobile device has already been logged into the app using admin issued credentials (username & password). 
3. If the user is authenticated, a green light lights up and a buzzer beeps which informs user to enter the premise. 
4. Steps 1, 2, 3 are repeated every time a user tries to enter a premise.

### Alternate Flows
- If an unregistered hardware (RFID chip or Bluetooth phone) is used to enter a premise: 
  1. The system will light up a red light and a buzzer will beep informing the user that their access is denied.

### Postconditions
User is allowed access to the premise when they use system registered hardware.
