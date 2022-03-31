const express = require("express");
const date = require(__dirname + "/date.js")

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs")

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.get("/", function(req, res) {
    // day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    // res.render("list", {kindOfDay: day[today.getDay()]})
    const day = date.getDate();

    res.render("list", {listTitle: day, itemsList: items})
});

app.post("/", (req, res) => {
    const item = req.body.newList;
    console.log(item)
    console.log(req.body)

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", itemsList: workItems})
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, function() {
    console.log("Server started on port 3000")
})