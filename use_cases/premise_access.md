## Premise Access (done by Soham)

### Actor (User)
An authorized and authenticated user possessing a system registered RFID chip/Mobile phone with BT functionality.

### Pre-conditions
User possesses either a RFID chip or a Bluetooth ready mobile phone or both where RFID chip is issued by the 
admin & the mobile device with the app installed and is already logged into the app which uses bluetooth technology to interact with the system (Raspberry Pi). Both the user credentials for a mobile app login and UUID for a RFID chip are already persisted in the database which are to be checked against when a user tries to enter a premise using any of these 2 technologies.

### Main Flow
1. The user taps the RFID chip or brings a mobile device close to the system (Rasp Pi).
2. The system checks whether the tapped RFID chip's UUID matches with any admin issued UUIDs stored in the database or whether the mobile device has already been logged into the app using admin issued credentials (username & password). A green light lights up and a buzzer beeps which tells user to enter the premise. 
4. User enters the premise and tries to access any other areas within the premise using either RFID chip or a bluetooth powered phone.
5. System checks for security clearance for the hardware used to access the area. A green light lights up and a buzzer beeps which tells user to enter the premise.
6. User enters the designated area. Steps 1, 2, 3 are repeated every time a user tries to enter a premise. Steps 4, 5, 6 are repeated every time a user tries to enter an area within a premise.

### Alternate Flows
- If an unregistered hardware (RFID chip or Bluetooth phone) is used to enter a premise: 
  1. The system will light up a red light and a buzzer will beep informing the user that their access is denied.
- If an unregistered hardware (RFID chip or Bluetooth phone) is used to enter an area within a premise:
  1. The system will light up a red light and a buzzer will beep informing the user that their access is denied.

### Postconditions
User is allowed access to the premise or an area within the premise when they use system registered hardware.
