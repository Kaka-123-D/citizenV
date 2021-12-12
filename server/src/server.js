const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");

const db = require("./config/sequelizeConfig");
const route = require("./route/route");
dotenv.config();

const {
  PORT,
  NODE_ENV,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  SESS_REMOVE_DB_TIME,
} = process.env;
const IN_PROD = NODE_ENV === "production";
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

db.testConnect()
  .then(() => {
    //Session store
    const sequelize = db.sequelize;
    const myStore = new SequelizeStore({
      db: sequelize,
      tableName: "sessions",
      checkExpirationInterval: parseInt(SESS_REMOVE_DB_TIME) * 60 * 60 * 1000,
    });
    myStore.sync();

    const app = express();

    // Middleware
    app.use(cors(corsOptions));
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    app.use(
      session({
        name: SESS_NAME,
        resave: false,
        store: myStore,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME) * 60 * 60 * 1000,
          sameSite: true,
          secure: IN_PROD,
          httpOnly: false,
        },
      })
    );

    //router
    route(app);

    app.listen(PORT, () => {
      console.log(`--------->Server running at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("--------->SERVER_ERROR!");
  });
