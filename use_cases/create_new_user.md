## Create New User (done by Philippe)

 ### Actor (Administrator)

A system administrator who has full access to all system functionality.

 ### Pre-Conditions

1. The actor is logged in.
2. The actor has authorization to create new users.
 
 ### Main Flow

1. The actor enters a first name.
2. The system validates the input.
3. The actor enters a last name.
4. The system validates the input.
5. The actor enters an email.
6. The system validates the input.
7. The actor enters a password.
8. The system validates the input.
9. The actor selects a location from a drop-down menu.
10. The system updates the drop-down menu's displayed option.
11. The actor chooses a clearance level from a drop-down menu.
12. The system updates the drop-down menu's displayed option.
13. The actor clicks the submit button.
14. The system processes the POST request.

 ### Alternate Flows

1. (A1) The actor entered no characters, illegal characters, too few characters, or too many characters.
2. (A2) The actor entered no characters, illegal characters, too few characters, or too many characters.
3. (A3) The actor did not enter a valid email.
4. (A4) The actor entered an email that already exists in the database.
5. (A5) The actor entered no characters, too few characters, too many characters, or too weak of a password.


 ### Post-Conditions

1. The new user is saved to the database.
2. The new user can sign into the Bluetooth app.
3. The new user's RFID chip causes a valid test scan.
