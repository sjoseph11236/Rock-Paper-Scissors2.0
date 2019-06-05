//  cash the dom : storing something for future use.
let computerScore = 0; 
let userScore = 0; 
let userScore_span = document.getElementById("user-score");
let computerScore_span = document.getElementById("computer-score");  
let scoreBoard_div = document.querySelector(".score-board");
let result_p = document.querySelector(".result > p");
let result_GameOver = document.querySelector("#endScreenContent > h2")
let rock_div = document.getElementById("rock");
let paper_div = document.getElementById("paper");
let scissors_div = document.getElementById("scissors");
let computerChoice_img = document.getElementById("compChoiceBoxImg")
let intro = document.getElementById("introMusic")
let maxWinsNum = 2; 
let x = document.getElementById('musicEnd');
let y = document.getElementById('musicPlus');

//---- Audio functions:

function playAudioWin() {
    // console.log("works")
    x.src = "priceTheme.mp3"
};

function playAudioLose() {
    // console.log("works")
    x.src = "youLose.mp3"
};

function playAudioPlus() {
    // console.log("works")
    y.src = "plus.mp3"
};
function playAudioNeg() {
    // console.log("works")
    y.src = "neg.mp3"
};

// -----

// create confetti particles
function create(i) {
    // Create confetti particles:

    // Generates random number, then multiples by 15
    let width = Math.random() * 15; 
    console.log('width ===>',width);
    // Takes generated width, multplues by .4 for height
    let height =width * 0.4;
    console.log('height ===>',height);
    // generates a random number to decide whether the confetti is blue, yellow, or red
    let colorIdx = Math.ceil(Math.random() * 3);
    let color = "red";
    console.log("colorIdx ==>", colorIdx);
    // select random color for particle
    switch(colorIdx){
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "blue";
            break;
        case 3:
            color = "red";
            break; 
    }

    // Create DOM object for particle
    // and add particle to wrapper
    $('<div class = "confetti-' + i + '' + color +'"></div>').css({
        "width" : width + "px",
        "height" : height + "px",
        "top": -Math.random() * 20 + "%",
        'left': Math.random() * 100 + "%",
        "opacity": Math.random() + 0.5,
        'transform': "rotate("+Math.random() * 360 *" deg)"
    }).appendTo('.wrapper');
    
    // Make confetti drop
    drop(i);
};

function drop(x) {
    $('.confetti-'+ x).animate({
        top: "100%",
        left: "+=" + Math.random() * 15 + "%"

    }, Math.random() * 2000 + 2000, function() {
        reset(x);
    });
};


function reset(x) {
    // Reset opacity
    $('.confetti-' + x).css('opacity','1');

    $('.confetti-' + x).animate({
        "top" : -Math.random() * 20 + "%",
        "left" : "-=" + Math.random()* 15 + "%"
    },0,function() {
        drop(x);
    });
};

function computerChoiceBox(computerChoice) {
    if(computerChoice == "rock"){
        console.log(computerChoice)
        computerChoice_img.src = "rock-2.png";
        computerChoice_img.style.width = '90%';
        computerChoice_img.style.height = '90%';
    }
     else if(computerChoice == "scissors"){
        console.log(computerChoice)
        computerChoice_img.src = "scissors-2.png";
        computerChoice_img.style.width = '90%';
        computerChoice_img.style.height = '90%';
    }
    else if(computerChoice == "paper"){
        console.log(computerChoice)
        computerChoice_img.src = "paper-2.png";
        computerChoice_img.style.width = '90%';
        computerChoice_img.style.height = '90%';
    }
    else { 
        computerChoice_img.src = "";
    }    
};

function getComputerChoice() {
    let choices = ["rock","paper","scissors"];
    let randomNumber = Math.floor(Math.random()* 3);
    return choices[randomNumber]; 
};


function wins(userChoice,computerChoice) {
    computerChoiceBox(computerChoice)
    userScore++;
    computerScore--;
    playAudioPlus();
    // maxWins has to be called in the wins and lose function in order to get the changing values of each player. 
    maxWins(userScore, computerScore);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "You win, " + userChoice + " beats " + computerChoice;
    document.getElementById(userChoice).classList.add("green-glow")
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('green-glow')},800);
};

// Create  function called maxWins thhat check for which player reachs taget number;paratmeters should be userScore and computersocre
function maxWins(userScore, computerScore) {
    // Create a varaible called max wins = 10
  
    // if statement that checks if  userScore = maxWins;
    if(userScore == maxWinsNum){
    // inside reslut_p .innerHTML = "GAME OVER! YOU WIN!"
        // console.log("GAME OVER! YOU WIN!")
        GameOverDisplay();
        playAudioWin();
        result_GameOver.innerHTML = 'YOU WIN!';
        for(let i = 0; i < 30; i++) {
            create(i);
        }
    }
    else{ 
        console.log(userScore)
    }
    
    if(computerScore == maxWinsNum){
    //  else if statment that checks if computerScore = maxWins; 
    // inside result_p.innerHTML = "GAMEOVER! YOU LOST!"
        // console.log("GAMEOVER! YOU LOST!")
        GameOverDisplay();
        playAudioLose();
        result_GameOver.innerHTML = 'YOU LOSE!';
    }
    else{ 
        console.log(computerScore)
    }
};

// functions to for overlay display to start and game over

function GameOverDisplay(){
    // console.log("visible")
    document.getElementById('overlay').style.display= "block";
};


function startGame(){
    document.getElementById('overlayIntro').style.display= "none";
    intro.src = "";

};

// function to reset userScore,computerScore result_p etc.; 
function replay(){
    document.getElementById('overlay').style.display= "none";
    userScore = 0; 
    computerScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = '';
    computerChoice_img.src = '';
    computerChoice_img.style.width = '';
    computerChoice_img.style.height = '';
    x.src = "";
};

function onClick(){ 
    replay()
    startGame()
};

function lose(userChoice,computerChoice) {
    computerChoiceBox(computerChoice)
    computerScore++;
    userScore--;
    maxWins(userScore, computerScore);
    playAudioNeg();
    computerScore_span.innerHTML = computerScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = "You lost, " + computerChoice + " beats " + userChoice;
    document.getElementById(userChoice).classList.add("red-glow")
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('red-glow')},800);
};

function draws(userChoice,computerChoice) {
    computerChoiceBox(computerChoice)
    computerScore_span.innerHTML = computerScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML =  "Draw!"
    document.getElementById(userChoice).classList.add("gray-glow")
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('gray-glow')},500);
};

function game(userChoice) {
    let computerChoice = getComputerChoice();

    switch(userChoice + computerChoice){
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            wins(userChoice,computerChoice);
            // computerChoiceBox(computerChoice);
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            lose(userChoice,computerChoice);
            // computerChoiceBox(computerChoice);
            break; 
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draws(userChoice,computerChoice);
            // computerChoiceBox(computerChoice);
            break;  
    }

}; 

game();
 
function main() {
    rock_div.addEventListener('click', function() {
        game("rock");
    }) 
     
    paper_div.addEventListener('click', function() {
         game("paper");
    }) 
     
    scissors_div.addEventListener('click', function() {
         game("scissors");
    }) 
};

main();
