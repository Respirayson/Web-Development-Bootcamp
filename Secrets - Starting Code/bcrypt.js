require("dotenv").config()
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10

const app = express();

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
})


app.route("/register")
.get((req, res) => {
    res.render("register");
})
.post((req, res) => {
    const userEmail = req.body.username;
    const userPassword = req.body.password;
    // const userPassword = md5(req.body.password);

    // console.log(userEmail);
    // console.log(userPassword);

    bcrypt.hash(userPassword, saltRounds, function(err, hash) {
        const newUser = new User({
            email: userEmail,
            password: hash
        })
    
        newUser.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.render("secrets");
            }
        })
    });
})


app.route("/login")
.get((req, res) => {
    res.render("login");
})
.post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const password = md5(req.body.password);

    // console.log(username)
    // console.log(password)

    User.findOne({email: username}, (err, foundUser) => {
        if (!err) {
            if (foundUser){
                bcrypt.compare(password, foundUser.password, function(error, result) {
                    if (result) {
                        res.render("secrets");
                    }
                });
            }
        } else {
            console.log(err);
        }
    })
});


app.listen(3000, function() {
    console.log("Server started successfully");
})