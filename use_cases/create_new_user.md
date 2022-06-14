## Create New User (done by Philippe)

 ### Actor (Administrator)

A system administrator who has full access to all system functionality.

 ### Pre-Conditions

1. The actor is logged in.
2. The actor has authorization to create new users.
 
 ### Main Flow

1. The actor enters a first name, last name, email, and password.
2. The actor selects a location from a drop-down menu.
3. The system updates the drop-down menu's displayed option.
4. The actor chooses a clearance level from a drop-down menu.
5. The system updates the drop-down menu's displayed option.
6. The actor clicks the submit button.
7. The system processes the POST request.

 ### Alternate Flows

1. The actor entered no characters, illegal characters, too few characters, or too many characters.
2. The actor entered no characters, illegal characters, too few characters, or too many characters.
3. The actor did not enter a valid email.
4. The actor entered an email that already exists in the database.
5. The actor entered no characters, too few characters, too many characters, or too weak of a password.


 ### Post-Conditions

1. The new user is saved to the database.
2. The new user can sign into the Bluetooth app.
3. The new user's RFID chip causes a valid test scan.
