
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//Keeps track of weather have started or not
var started = false;
var level = 0;

$(document).keypress(function(event) {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function(){
   //alert($(this).attr("id"));
   var userChosenColour = $(this).attr("id"); //find out the id of the elements you've clicked
   userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
   checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    console.log("current Level:" + currentLevel);
    //if the most recent user answer is the same as the game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        console.log(userClickedPattern.length);
        console.log(gamePattern.length);
        if(userClickedPattern.length === gamePattern.length) {
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call startOver() if the user gets the sequence wrong.
        startOver()
    }
   
}

function nextSequence() {

//Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
userClickedPattern = [];

//Increase the level by 1 Everytime the nextSequence is called
  level++;    

//Update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  //select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 
  playSound(randomChosenColour);

}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    // alert(currentColour);
    $("#"+currentColour).addClass("pressed"); //Adds class to the button that was pressed

    setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100); ////Removes class from the button that was pressed
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

