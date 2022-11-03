## Reissue RFID Key (done by Omar)

### Actor (Admin)
Admin with valid credentials who is able to access and update the system.

### Pre-conditions
User exists in the system, and requests a new key (Admin must be logged in to issue new key) 

### Main Flow
1. The Admin requests identification 
2. System validates the user 
3. The Admin issues a request to generate a new UUID
4. The system generates a new key and replaces the old key making it obsolete
5. Admin gives user new RFID chip

### Alternate Flows
- User could not be authenticated through the system with valid ID
  1. User can use system credentials to authenticate their identity 
- User does not have mobile app
  1. User cannot be authenticated through system
  2. User must get clerance from a higher authority on premise

### Post-conditions
After the Admin issues a new key, a new UUID will be registered to the database and the new key will be available for use with the same levels of access the user previously had and the old key will become useless and will no longer grant access.
