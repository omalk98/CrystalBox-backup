## First User Login (done by Philippe)

 ### Actor (User)

A user who has downloaded the Bluetooth-enabling app. 

 ### Pre-Conditions

1. An admin has made a user account for the actor.
2. The actor has received their login credentials from an admin.
 
 ### Main Flow

1. The actor enters their username and password, then attempts to log in.
2. The system verifies the entered credentials. If valid, the actor is prompted to create a new password.
3. The actor enters their current password, their new password, and a confirmation password that matches their new password.
4. The system checks the password against the established password policy. If the password is valid, the actor's password is changed and they are authenticated.

 ### Alternate Flows

1. If the actor enters incorrect login credentials, they are not prompted to change their password.
2. If the actor attempts to navigate to other routes while their password is their admin-provided password, they will be brought back to the password change route.
3. If the actor's changed password is the same as their current password, or if the password fails the password policy check, the actor will be prompted for a different password.


 ### Post-Conditions

1. The new password is saved to the database.
2. The actor is authenticated and redirected to the app's home page.
