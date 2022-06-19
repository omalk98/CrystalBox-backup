# Project Crystal Box

## 1. Introduction

Our project aims to elevate the concept of a simple attendance system and add a layer of security to the system which can be utilized in more secure environments such as a school/college, event, or work environment. The system will use two main access methods, Bluetooth and RFID chips, to provide a secure access point where the user must present valid credentials (admin issued UUID) to be able to enter the premise. Both RFID & BT gateways will share the UUID generated for each user when they are added to the system. When the user attempts to access the system, it will firstly check against the user's credentials before recording them to the database to mark them for attendance. The system will provide multi level access using user-roles as a security measure against accessing certain rooms/areas, allowing the admin to control which users have access to those rooms/areas.

May 24th, 2022

Current Version: 1.0

Project Developers/Designers:
- Omar Hussein
- Soham Thaker
- Philippe Cormier

## 2. Overview

The Anteaters, Omar, Soham, and Philippe, are planning to develop an attendance security door system to facilitate monitoring the attendance of people at an event/conference or a school/college.

## 3. Milestones
1. List of technological choices for front-end, back-end, database, and hosting defined: [link](https://github.com/CAPSTONE-2022-2023/Group_04/blob/main/technical_details.md).
2. Install necessary tools, software & programs to be ran in the background on Rasp Pi.
3. Make necessary hardware connections like RFID reader, buzzer & light with Rasp Pi.
4. Develop a skeleton web application (frontend + backend) with no interactive tools (static test pages).
5. Mobile app (frontend, like user login & user athentication) is designed and tested.
6. Mobile app (built-in bluetooth interaction with Rasp Pi's Bluetooth module) is designed and tested.
7. User dashboard & monitoring tools are designed and tested on the web application.
8. Admin dashboard & monitoring tools are designed and tested for the admins on the web application.

## 4. Deliverables 

1. Software & Hardware modules installed and active on Rasp Pi (lights, buzzers, RFID reader & key fob, etc).
2. Web application for Users and Admin (no interactive functions delivered yet).
3. Mobile app is published on the App Store/Play store for the users to download and start using the app.
4. Mobile app works in its entirity for software part of the app (eg, login form, user auth, etc), published on Play Store/App Store.
5. Mobile app is ready to use built-in Bluetooth to interact with the Bluetooth module on Rasp Pi.
6. User dashboard & monitoring tools (eg, update user password, reissuing RFID, deleting a user(revoke access to RFID, username & password), etc) are published.
7. Admin dashboard & monitoring tools (eg, CRUD operations for user, track user footprints, etc) are up and running.

## 5. Risks, Assumptions, and Constraints

### 5.1 Risks

- Raspberry Pi short circuit due to power overload from external components.
- RFID chip/reader susceptible to close proximity hack attempts. 
- Mobile bluetooth module and/or Raspberry Pi bluetooth module vulnerable to bluetooth hacks.
- User credentials exploitation through cross-site scripting and other server attacks.
- Web portal and/or Mobile app compromisation due to API link exposure.
- Web server down due to overload of requests from users.

### 5.2 Assumptions

- Abc

### 5.3 Constraints

- RFID chip range has a limit as to how closer it can be brought to make a contact with the RFID reader.

## 6. Organization/Stakeholders

| Project Role | Responsibilities | Assigned to |
| ----------- | ----------- | ----------- |
| Project Manager | Design and maintain the website| Marcel Jar|
| Project Sponsor | Cover website costs | Marcel Jar|
| Users | Access the provided contents  | Seneca Students|
