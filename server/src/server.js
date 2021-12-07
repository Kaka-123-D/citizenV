const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const db = require('./config/sequelizeConfig');
const route = require('./route/route');
dotenv.config();

const {PORT, NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME} = process.env;
const IN_PROD = NODE_ENV === 'production';

db.connect();
const sequelize = db.sequelize;
const myStore = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions'
});

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(session({
  name: SESS_NAME,
  resave: false,
  store: myStore,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: Number(SESS_LIFETIME),
    sameSite: true,
    secure: IN_PROD
  }
}))

myStore.sync();

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
