## Create new Admin (done by Soham)

### Actor (Admin)
The system initially has a set Admin who has full access to the system and can create new admins.

### Pre-conditions
Admin is logged into the sytem using their credentials.

### Main Flow
1. Actor navigates to the page that allows them to create a new admin. 
2. System asks the user to fill up the required input fields.
3. Actor inputs admin's first name, last name, email address, system access level and clicks submit.
4. System generates a random hashed password for newly created admin & stores all the details to a database. 

### Alternate Flows
- User enters invalid characters for the required input fields.
  1. System shows a pop up informing them about the error regarding invalid characters. 
- User misses entering any of the required fields.
  1. System shows a pop up informing them about the error regarding required input fields.
- User tries to create a new user but the backend server is down.
  1. System shows an informative 503 Servive Unavailable page.
  2. System optionally asks the user to fill out a report which is sent directly to the developers of the system.

### Post-conditions
Admin receives an email which mentions newly created admin's details like username (admin's email) and the system generated hashed password 
so that he/she can forward that to the admin.
