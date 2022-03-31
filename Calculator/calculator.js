const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    console.log(req.body)

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var sum = num1 + num2

    res.send("The sum is " + sum)
})

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bmicalculator", function(req, res) {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);

    var BMI = weight / (Math.pow(height, 2))

    res.send("Your BMI is " + BMI);
})

app.listen(3000, function() {
    console.log("Server started on localhost:3000")
})