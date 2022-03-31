// alert("hello")
console.log($("h1"));

var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0

$(document).keydown(function() {
    if (level === 0) {
        $("h1").text("Level 0")
        nextSequence()
    };
})


$(".btn").click(function() {
    var userChosenColour = this.id;
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    switch (name) {
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break
        default:
            var wrong = new Audio("sounds/wrong.mp3")
            wrong.play();
            break

    }
}

function nextSequence() {
    level += 1;
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]

    console.log(randomChosenColour)

    gamePattern.push(randomChosenColour)
    console.log(gamePattern)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)

    $("h1").text("Level " + level)
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence()
                userClickedPattern = [];
                console.log(userClickedPattern);
            }, 1000)
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
}