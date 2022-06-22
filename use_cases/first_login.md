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

1. The actor enters their admin-provided credentials incorrectly.  
1.1. An appropriate error message(s) is displayed.  

2. While on the password change route, the actor attempts to navigate to another route without reseting their password.  
2.1 The system redirects them to the password change route.  
3. The actor's changed password fails the password policy check (too short, not enough variety, matches current password, etc...)  
3.1. An appropriate error message(s) is displayed.  


 ### Post-Conditions

1. The new password is saved to the database.
2. The actor is authenticated and redirected to the app's home page.
