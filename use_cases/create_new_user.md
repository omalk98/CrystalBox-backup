Actor (Administrator)

A system administrator who has full access to all system functionality.

Pre-Conditions

1. The actor is logged in.
2. The actor has authorization to create new users.
 
Main Flow

1. The actor enters a first name. (A1)
2. The actor enters a last name. (A2)
3. The actor enters an email. (A3, A4)
4. The actor enters a password. (A5)
5. The actor selects a location from a drop-down menu.
6. The actor chooses a clearance level from a drop-down menu.
7. The actor registers the new user.

Alternate Flows

(A1) The actor entered no characters, illegal characters, too few characters, or too many characters.
(A2) The actor entered no characters, illegal characters, too few characters, or too many characters.
(A3) The actor did not enter a valid email.
(A4) The actor entered an email that already exists in the database.
(A5) The actor entered no characters, too few characters, too many characters, or too weak of a password.


Post-Conditions

1. The new user is saved to the database.
2. The new user can sign into the Bluetooth app.
3. The new user's RFID chip causes a valid test scan.
