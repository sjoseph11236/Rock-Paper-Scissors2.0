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

function computerChoiceBox(computerChoice) {
    
    if(computerChoice == "rock"){
        console.log(computerChoice)
        computerChoice_img.src = "rock-2.png";
        computerChoice_img.alt = "rock";
        computerChoice_img.style.width = '90%';
        computerChoice_img.style.height = '90%';
    }
     else if(computerChoice == "scissors"){
        console.log(computerChoice)
        computerChoice_img.src = "scissors-2.png";
        computerChoice_img.alt = "scissors";
        computerChoice_img.style.width = '90%';
        computerChoice_img.style.height = '90%';
    }
    else if(computerChoice == "paper"){
        console.log(computerChoice)
        computerChoice_img.src = "paper-2.png";
        computerChoice_img.alt = "paper";
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
        gameOverDisplay();
        playAudioWin();
        result_GameOver.innerHTML = 'YOU WIN!';
    }
    else if(computerScore == maxWinsNum){
        //  else if statment that checks if computerScore = maxWins; 
        // inside result_p.innerHTML = "GAMEOVER! YOU LOST!"
        // console.log("GAMEOVER! YOU LOST!")
        gameOverDisplay();
        playAudioLose();
        result_GameOver.innerHTML = 'YOU LOSE!';
    }
    else{ 
        console.log(computerScore)
    }
};

// functions to for overlay display to start and game over

function gameOverDisplay(){
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
    computerChoice_img.alt = '';
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


