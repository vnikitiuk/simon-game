var gamePattern = [];

var userClickedPattern = [];

var animals = ["pig", "sheep", "cow", "chicken"];


$(document).keypress(function(){
    if (gamePattern.length === 0) {
        nextLevel();
    };
});

$(".btn").click(function(){

    var userChosenAnimal = $(this).attr("id");
    userClickedPattern.push(userChosenAnimal);

    playSound (userChosenAnimal);
    animatePress (userChosenAnimal);

    checkAnswer(userClickedPattern.length-1);
});


function nextLevel() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * animals.length);
    
    var randomChosenAnimal = animals[randomNumber];
   
    $("#" + randomChosenAnimal).fadeOut(100).fadeIn(100);
    playSound (randomChosenAnimal);

    gamePattern.push(randomChosenAnimal);

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
    playSound ("gameover");
    $("h1").text("Let's Start Over, Press Any Key");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 700);
    gamePattern = [];
}

function playSound (name) {
    new Audio (`sounds/${name}.mp3`).play();
}

function animatePress (currentAnimal) {
    $(".btn." + currentAnimal).addClass("pressed");
    setTimeout(function() {
        $(".btn." + currentAnimal).removeClass("pressed");
    }, 100);
}
