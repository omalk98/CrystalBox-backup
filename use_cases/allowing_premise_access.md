## Allowing a user into a premise (done by Soham)

### Actor (User)
An authorized and authenticated user possessing a system registered RFID chip/Mobile phone with BT functionality.

### Pre-conditions
User possesses either has a RFID chip or a Bluetooth ready mobile phone or both where RFID chip is issued by the 
admin & the mobile device with the app installed and is already logged into the app which uses bluetooth technology to interact with the system (Raspberry Pi). Both the user credentials for a mobile app login and UUID for a RFID are already persisted in the database which are to be checked against when a user tries to enter a premise using any of these 2 technologies.

### Main Flow
1. The user taps the RFID or brings a mobile device close to the system (Rasp Pi).
2. The system checks whether the tapped RFID's UUID matches with any admin issued UUIDs stored in the database or whether the mobile device has already been logged into the app using admin issued credentials (username & password).
3. The system loads a list of all groups.
4. The faculty clicks on a **send message** hyperlink below a group's list of members.
5. The system brings up a model containing a form for the faculty to enter the email's subject and contents.
6. The faculty fills up both fields.
7. The faculty clicks on a **Submit** button to send the message to all students.
8. After the system succesfuly sends the message, the modal disapears.

### Alternate Flows
- If any connection issues arise, preventing the message to be sent before it times out: 
  1. The system will add an error message to the modal, warning the faculty that the message was not sent.
- If a faculty clicks on **Close**, instead of **Submit**:
  1. The modal disappears, and no further action is taken by the system. The contents of the modal will remain, though. Allowing the faculty to pick another group to send the message, for example.

### Postconditions
After a faculty has succesfully send a message, each member of the group (as well as the faculty) receives an email with its contents.
