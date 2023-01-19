const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mysql = require("mysql");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vader1064",
  database: "Test",
});

connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.post("/api", (req, res) => {
  const lat = req.body[0];
  const lon = req.body[1];
  const time = req.body[2];

  // converting timestap to datetime format
  var date = new Date(time * 1000);

  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();

  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    year +
    "-" +
    month.substr(-2) +
    "-" +
    day.substr(-2) +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  console.log(formattedTime);

  const INSERT_USER_QUERY = `INSERT INTO location VALUES('${formattedTime}', ${lat}, ${lon})`;
  connection.query(INSERT_USER_QUERY, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
