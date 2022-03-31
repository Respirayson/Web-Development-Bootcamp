const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    // res.send("Server is running");
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    console.log("Post received")
    console.log(req.body.cityName);

    const location = req.body.cityName;
    const apiKey = "bca92a2fbb9491cbb5c38e0fdf64d813"
    const units = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=" + units
    
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            // console.log(temp)

            const weatherDescription = weatherData.weather[0].description;
            // console.log(weatherDescription);
            
            const icon = weatherData.weather[0].icon;
            // console.log(icon)

            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(iconUrl)

            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img src=" + iconUrl + ">");

            res.write("<p>The weather is currently " + weatherDescription + ".</p>");
            res.write("<h1>The temperature in " + location + " is  " + temp + " degrees celsius. </h1>");
            res.send();
        })
    })
})



app.listen(3000, function() {
    console.log("Server started on port 3000")
})