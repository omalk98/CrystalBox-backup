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
1. List of technological choices for front-end, back-end, database, and hosting defined: [link](https://github.com/CAPSTONE-2022-2023/Group_04/blob/main/technical_details.md)
2. Install necessary tools, software & programs to be ran in the background on the Raspberry Pi.
3. Prepare a skeleton web application (frontend + backend) with no interactive tools (static test pages).
4. Mobile app (frontend) is designed and published to the store.
5. Mobile app (built-in bluetooth interaction) designed and tested.
6. User dashboard & monitoring tools fully implemented.
7. Admin dashboard & monitoring tools up and running for user.

## 4. Deliverables 

1. Hardware modules installed and active (lights, buzzers, rfid reader).
2. Web portal - User portal & Admin portal — No interactive functions.
3. Mobile app works in its entirity, published on Play Store/App Store(login form, update the password) (except the BT).
4. Mobile app interaction with the bluetooth module (making the app ready to interact with rasp pi).
5. User dashboard & monitoring tools (update user password, reissue rfid), deleting(revoke access to rid, username & password).
6. Admin dashboard & monitoring tools (CRUD operations for user, track user footprints)
