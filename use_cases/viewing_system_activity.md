## Viewing System Activity (done by Omar)

### Actor (Admin)
Admin with valid credentials who is able to access system tools and utilities.

### Pre-conditions
Admin must have valid credentials and be logged in to view system activity logs and records  

### Main Flow
1. Admin chooses user data set to review
2. System requests data set age ( period of - day, week, month, year)
3. Admin chooses data seet age
4. System retrives user data set and requests for viewing style (Graph, Pie, Bar, Line)
5. Admin chooses viewing style
6. System generates report 

### Alternate Flows
- Admin authentication token expired
  1. System ignores data request and responds with 403 Unauthorized error
  2. System logs admin out of session
- Admin does not choose viewing style
  1. System generates default report (weekley)
- No data available for requested period
  1. System responds with 404 Not Found error
- System API is down, unresponsive, or overloaded
  1. System will respond with a 503 Service Unavailable error

### Post-conditions
The system frontend portal will display statistics and graphs based on the data received from the system backend API.
