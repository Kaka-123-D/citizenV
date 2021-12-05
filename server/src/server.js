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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

route(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});
