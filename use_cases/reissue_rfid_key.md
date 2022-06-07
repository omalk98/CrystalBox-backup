## Reissue RFID Key (done by Omar)

### Actor (Admin)
Admin with valid credentials who is able to access and update the system.

### Pre-conditions
User exists in the system, lost their RFID key, and requests a new one (Admin must be logged in to issue new key) 

### Main Flow
1. The user requests a new RFID key from Admin
2. The Admin requests identification and validates the user through the system
3. The Admin issues a request to generate a new UUID
4. The system generates a new key and replaces the old key making it obsolete
5. The system logs out the user session on mobile application to replace the old key 
6. Admin gives user new RFID chip

### Alternate Flows


### Postconditions
After the Admin issues a new key, a new UUID will be registered to the database and the new key will be available for use with the same levels of access the user previously had and the old key will become useless and will no longer grant access.
