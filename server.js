// Imports
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const cors = require("cors");
const app = express();
const knex = require("knex")
// Controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'face-recognition'
    }
  });


app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {res.json(db("users").select("*"))})
app.post("/signin", (req, res) => { signin.signinHandler(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register.registerHandler(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.getProfile(req, res, db)})
app.put("/image", (req, res) =>{ image.processImage(req, res, db)})
app.post("/imageURL", (req, res) =>{ image.APIHandler(req, res)})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("app is running on port " + PORT );
});



