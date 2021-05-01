var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keypress(function(){
    if (gamePattern.length === 0) {
        nextLevel();
    };
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound (userChosenColour);
    animatePress (userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextLevel() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    
    var randomChosenColour = buttonColours[randomNumber];
   
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound (randomChosenColour);

    gamePattern.push(randomChosenColour);

    $("h1").text("level " + gamePattern.length);
}

function checkAnswer (index){
    if (gamePattern[index] === userClickedPattern[index]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextLevel();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver () {
    playSound ("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
}

function playSound (name) {
    new Audio (`sounds/${name}.mp3`).play();
}

function animatePress (currentColour) {
    $(".btn." + currentColour).addClass("pressed");
    setTimeout(function() {
        $(".btn." + currentColour).removeClass("pressed");
    }, 100);
}
