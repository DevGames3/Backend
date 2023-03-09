const express = require("express");
const db = require("./db");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const {
  User,
  Game,
  Platform,
  Genres,
  Tag,
  Developer,
  Library,
  Transaction,
  Cart,
} = require("./models");

const PORT = 3001;
const server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("Data Base Connect");

  server.listen(PORT, () => {
    console.log("Server listening at port: " + PORT);
  });
});
