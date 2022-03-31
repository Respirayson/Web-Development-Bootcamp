// First Dice Image
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber1);

var newImage1 = "images/dice" + randomNumber1 + ".png";
console.log(newImage1);
document.querySelector(".img1").setAttribute("src", newImage1);

// Second Dice Image
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber2);

var newImage2 = "images/dice" + randomNumber2 + ".png";
console.log(newImage2);
document.querySelector(".img2").setAttribute("src", newImage2);

// Who won
if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 wins";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 wins";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}