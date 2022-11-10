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
The server will run on **PORT 5555** in development and the client will be running on **PORT 3000**.

Create a file `./server/.env`.
Add a variable as such `VITE_DEV_NETWORK_IP = 192.168.122.1` replacing the IP address with the address of your network.

NOTE: The name of the variable must match the example provided on the previous line.

You may add a value of `SERVER_ADDRESS = 192.168.122.1` to the `./server/.env` file but it will be ignored in the development environment, and will only be used on the production server.

Launch node from a terminal window

```
node
```

and run this command **TWICE**:

```javascript
console.log(require('crypto').randomBytes(64).toString('hex'));
```

Copy each value into a variable in `./server/.env`, naming those values
`ACCESS_TOKEN_SECRET = generated_secret1` and `REFRESH_TOKEN_SECRET = generated_secret2`

Get you MongoDB local or Atlas instance uri and insert it into `./server/.env` as a variable with the name `MONGO_URI = your_mongo_uri`.

To populate the database for the first time launch the server and navigate to [http://localhost:5555/populate-db](http://localhost:5555/populate-db), and check you MongoDB cluster and make sure users and passwords contain **2002** records

The default credentials for login are `username = test` and `password = 12345`
