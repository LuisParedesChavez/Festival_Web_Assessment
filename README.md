# Festival Web Assessment (Node.js + SQLite)
Small Node.js project for a festival web app. It serves pages from views/ and static files from public/, and uses a SQLite database.

## What’s inside
app.js — Main server entry.

views/ — Templates/pages (e.g., EJS/HTML).

public/ — Static assets (css/js/images).

package.json — Project metadata and scripts.

setup.sql — Schema/seed for the SQLite database.

festival.db — Local SQLite database (development artifact, can be recreated from setup.sql).

Requirements
Node.js 18+

npm

(Optional) SQLite CLI if you want to rebuild the DB from setup.sql using a command

Windows: download “sqlite‑tools‑win‑x64” from the official SQLite site and add it to PATH.

Setup & Run (Windows PowerShell or CMD)
bash
Copy
Edit
## 1) Install dependencies
npm install

## 2) (Optional) Recreate the database from setup.sql
 Run this only if you want a fresh DB
 Make sure you are IN the project folder
 If you have the SQLite CLI installed:
sqlite3 festival.db < setup.sql

## 3) Start the server
 If package.json has a start script:
npm start

## Otherwise run directly:
node app.js
The server typically runs on http://localhost:3000 (or whatever port app.js uses).
If the port is busy, stop other servers or change the port in app.js.

NPM scripts (recommended)
Add these to package.json if they aren’t there yet:

json
Copy
Edit
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
Then you can run:

bash
Copy
Edit
npm run dev   # auto‑reload during development (requires nodemon)
npm start     # run once
Folder structure
pgsql
Copy
Edit
luisapc_10386588_web_assesment/
├─ public/
├─ views/
├─ app.js
├─ package.json
├─ package-lock.json
├─ setup.sql
└─ festival.db   (local dev file; ignored in .gitignore in most setups)
# Notes
 Keep festival.db out of Git for a cleaner repo; use setup.sql to rebuild it.

 If you need environment variables later, create a .env file and load it with dotenv (and keep .env in .gitignore).

 If you see “sqlite3 not recognized,” either install the SQLite CLI or just skip step 2 and use the existing festival.db.