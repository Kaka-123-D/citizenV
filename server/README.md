# Welcome to my project!

## Step 0: Install nodejs
## Step 1: Install library necessary
- npm install
## Step 2: Create file .env(with Window)
- cd .  >.env
## Step 3: Insert info to file .env
- PORT=?
- NODE_ENV='development'
- SESS_NAME='sid'
- SESS_SECRET=?
- SESS_LIFETIME=?(hours)
- SESS_REMOVE_DB_TIME=?(hours)
- SALT_ROUND=10
## Step 4: Import file citizens.sql in src/db  to my database
## Step 5: Run server
- npm start
## Step 6: Create account administration
- Open another terminal
- npm run create-admin-account