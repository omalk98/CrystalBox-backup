# Setting up the Development environment

Open 2 terminal windows and run each command in a different terminal window,
assuming you are in the CrystalBox root directory...

Mac/Linux:

```bash
cd ./server && npm install && npm run dev

cd ./server && npm run srv
```

Windows:

```powershell
chdir .\server && npm install && npm run dev

chdir .\server && npm run srv
```

You may use **PNPM** or **YARN** instead of **NPM**

To have network access to the server and frontend, launch the frontend first.
Vite will display the network IP address the server and client are running on. This value is important.
The server will run on **PORT 5000** in development and the client will be running on **PORT 3000**.

Create a file `./server/.env`.
Add a variable as such `VITE_DEV_NETWORK_IP = 192.168.122.1` replacing the ip address with the address of your network.
NOTE: The name of the variable must match the example provided on the previous line.

Launch node from a terminal window

```
node
```

and run this command **TWICE**:

```javascript
console.log(require('crypto').randomBytes(64).toString('hex'));
```

Copy each value into a variable in `./server/.env`, naming those values
`ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`
