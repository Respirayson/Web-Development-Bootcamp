const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs"); 

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get((req, res) => {
    Article.find({}, (err, foundArticles) => {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    })
})
.post((req, res) => {
    const title = req.body.title
    const content = req.body.content

    const newArticle = new Article({
        title: title,
        content: content
    })

    newArticle.save((err) => {
        if (!err) {
            res.send("Successfully added a new article");
        } else {
            res.send(err);
        }
    });
})
.delete((req, res) => {
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfully deleted all the articles");
        } else {
            res.send(err)
        }
    })
});

app.route("/articles/:title")
.get((req, res) => {
    const articleTitle = req.params.title;

    Article.findOne({title: articleTitle}, (err, foundArticle) => {
        if (!err) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No article found")
            }
        } else {
            res.send(err)
        }
    })
})
.put((req, res) => {
    Article.replaceOne(
        {title: req.params.title},
        {
            title: req.body.title,
            content: req.body.content
        },
        function(err) {
            if (!err) {
                res.send("Successfully updated the article");
            }
        }
    );
})
.patch((req, res) => {
    Article.updateOne(
        {title: req.params.title},
        {$set: req.body},
        function(err) {
            if (!err) {
                res.send("Successfully updated the article");
            } else {
                res.send(err);
            }
        }
    )
})
.delete((req, res) => {
    Article.deleteOne(
        {title: req.params.title},
        function(err) {
            if (!err) {
                res.send("Successfully deleted the article");
            } else {
                res.send(err);
            }
        }
    )
});

app.listen(3000, function() {
    console.log("Server started successfully on port 3000")
})