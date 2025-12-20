
var buttonColours=["red", "blue", "green", "yellow"];  //array of colors
var gamePattern=[];           //to store the game pattern
var userClickedPattern=[];    //to store the user clicked pattern

var started=false;   //to check if the game has started or not
var level=0;
$(document).keypress(function(){   //detecting keypress to start the game
    if(!started){
        $("#level-title").text("Level "+level);   //updating the h1 with the change in level
        nextSequence();
        started=true;  //updating started to true
    }       
});

 $(".btn").click(function(){    //detecting clicks

  var userChosenColour = $(this).attr("id");  //storing the id of the clicked button
  userClickedPattern.push(userChosenColour); //pushing user clicked color to userClickedPattern
       //console.log(userClickedPattern);
   
    playSound(userChosenColour);   //playing sound
    animatePress(userChosenColour); //animation for button press 
    checkAnswer(userClickedPattern.length-1); //passing the index of the most recent answer(last element in userClickedPattern)
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){  //checking the most recent answer
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){   //checking if the user has finished their sequence
            setTimeout(function(){
                nextSequence(); //calling nextSequence function after 1 second
            },1000); //1 second delay
    } 
} else{
            console.log("wrong");
            playSound("wrong"); //playing wrong sound
            $("body").addClass("game-over"); //adding game-over class to body
             setTimeout(function(){
                $("body").removeClass("game-over");
            },200); //removing game-over class after 200 milliseconds

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver(); //restart the game
        }
    }

function nextSequence(){   //random color generator
    userClickedPattern=[];   //resetting the userClickedPattern for next level  
    level++;             // update the h1 with change in the value of level
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);    //pushing random color to game pattern

$("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   //animation flash
playSound(randomChosenColour);
}
function playSound(name){  //playing sound
        var audio = new Audio("sounds/"+name+".mp3");
        audio.play();
    }

function animatePress(currentColour){   //animation for button press
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){  
        $("#"+currentColour).removeClass("pressed");
    },100);
}
    function startOver(){   //restart the game
        level=0;
        gamePattern=[];
        started=false;
    }       

  
