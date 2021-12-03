const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/sequelizeConfig');
const route = require('./route/route');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

db.connect();
route(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});
