var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0
var started = false

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;

    }
  });

function nextSequence() {
    userClickedPattern = [];

    level += 1
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor ).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    
}


$(".btn").click(function() {
    var userChosenColor = this.id;
    $("#" + userChosenColor ).addClass("pressed");
    setTimeout(() => {$("#" + userChosenColor ).removeClass("pressed");}, 100);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(color) {
    audio = new Audio('./sounds/' + color + '.mp3')
    audio.play();
}


function checkAnswer(level) {

 if (userClickedPattern[level] === gamePattern[level]) {
  console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
       }, 1000);
    }
 } else {
  console.log('wrong');
  playSound('wrong');
  $('body').addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(() => {
    $('body').removeClass("game-over");
  }, 200);
  startOver()
 }
}


function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}