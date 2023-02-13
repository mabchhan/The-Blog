const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const routes = require("./controllers");
const path = require("path");
// handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "public")));
const sess = {
  secret: "super super secret",
  cookie: { MaxAge: 10 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});

// app.listen(PORT, () =>
//   console.log(
//     `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
//   )
// );
