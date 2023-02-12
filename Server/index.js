const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 9;

{/*Connecting User to the Database*/}

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vijay@123",
  database: "login",
});

app.use(express.json());
app.use(cors());

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (email, password) VALUES (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "User Registered Sucessfully" });
          }
        );
      });
    } else {
      res.send({ msg: "Email Already Registered" });
    }
  });
});

{/*Login Verification*/}

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response == true) {
          res.send(response)
        
          
        } else {
          res.send({ msg: "incorrect email or password" });
        }
      });
    } else {
      res.send({ msg: "User not registered!" });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
