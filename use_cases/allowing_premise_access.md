## Allowing a user into a premise and any other areas within the same premise (done by Soham)

### Actor (User)
An authorized and authenticated user possessing a system registered RFID chip/Mobile phone with BT functionality.

### Pre-conditions
User possesses either has a RFID chip or a Bluetooth ready mobile phone or both where RFID chip is issued by the 
admin & the mobile device with the app installed and is already logged into the app which uses bluetooth technology to interact with the system (Raspberry Pi). Both the user credentials for a mobile app login and UUID for a RFID are already persisted in the database which are to be checked against when a user tries to enter a premise using any of these 2 technologies.

### Main Flow
1. The user taps the RFID chip or brings a mobile device close to the system (Rasp Pi).
2. The system checks whether the tapped RFID chip's UUID matches with any admin issued UUIDs stored in the database or whether the mobile device has already been logged into the app using admin issued credentials (username & password). A green light lights up and a buzzer beeps which tells user to enter the premise. 
4. User enters the premise and tries to access any other areas within the premise using either RFID chip or a bluetooth powered phone.
5. System checks for security clearance for the hardware used to access the area. A green light lights up and a buzzer beeps which tells user to enter the premise.
6. User enters the designated area. Steps 4, 5, 6 are repeated every time a user tries to enter an area within a premise.

### Alternate Flows
- If any connection issues arise, preventing the message to be sent before it times out: 
  1. The system will add an error message to the modal, warning the faculty that the message was not sent.
- If a faculty clicks on **Close**, instead of **Submit**:
  1. The modal disappears, and no further action is taken by the system. The contents of the modal will remain, though. Allowing the faculty to pick another group to send the message, for example.

### Postconditions
After a faculty has succesfully send a message, each member of the group (as well as the faculty) receives an email with its contents.
