function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        drawScore++;
        return "Draw";
    } else if (
        (humanChoice === 'Rock' && computerChoice === 'Paper') || 
        (humanChoice === 'Paper' && computerChoice === 'Scissors') || 
        (humanChoice === 'Scissors' && computerChoice === 'Rock')
    ) {
        loseScore++;
        return "Lose";
    } else {
        winScore++;
        return "Win";
    }
}

function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function playerSelection(playerChoice) {
    const humanSelection = playerChoice;
    const computerSelection = getComputerChoice();

    const result = playRound(humanSelection, computerSelection);
    winResult.textContent = `Won: ${winScore}`;
    loseResult.textContent = `Lost: ${loseScore}`;
    drawResult.textContent = `Draw: ${drawScore}`;
    
    handleEnemyButtons(computerSelection);
    handlePlayerButtons(humanSelection);
    return result;
}

function handleEnemyButtons(computerSelection) {
    if (computerSelection === 'Rock') {
        enemyContainer.replaceChildren(enemyRockButton);
    } else if (computerSelection === 'Paper') {
        enemyContainer.replaceChildren(enemyPaperButton);
    } else if (computerSelection === 'Scissors') {
        enemyContainer.replaceChildren(enemyScissorsButton);
    }
}

function handlePlayerButtons(humanSelection) {
    disablePlayerButtons();

    if (humanSelection === 'Rock') {
        playerContainer.replaceChildren(rockButton);
    } else if (humanSelection === 'Paper') {
        playerContainer.replaceChildren(paperButton);
    } else if (humanSelection === 'Scissors') {
        playerContainer.replaceChildren(scissorsButton);
    }
    gameContainer.appendChild(playAgainButton);
}

function enablePlayerButtons() {
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
}

function disablePlayerButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}

let winScore = 0;
let loseScore = 0;
let drawScore = 0;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const enemyRockButton = document.getElementById("enemy-rock");
const enemyPaperButton = document.getElementById("enemy-paper");
const enemyScissorsButton = document.getElementById("enemy-scissors");
const resultContainer = document.querySelector(".result-container");
const scoresContainer = document.querySelector(".result-container .container");
const winResult = document.getElementById("win-score");
const loseResult = document.getElementById("lose-score");
const drawResult = document.getElementById("draw-score");
const playerContainer = document.querySelector(".player-container");
const enemyContainer = document.querySelector(".enemy-container");
const gameContainer = document.querySelector(".game-container");
const startOverButton = document.getElementById("start-over");

const gameOverModal = document.querySelector(".modal");
const gameOverModalContainer = document.querySelector(".modal-container");
const gameOverResult = document.createElement("h3");
gameOverResult.style.whiteSpace = "pre-line"; // Enables \n line breaks

const playAgainButton = document.createElement("button");
playAgainButton.classList.add("play-again-button");
playAgainButton.textContent = "↻ Play again!";

const matchResult = document.createElement("div");

function handleStartOverButton() {
    gameOverModal.classList.remove("show");
    winScore = 0;
    loseScore = 0;
    drawScore = 0;
    winResult.textContent = `Won: 0`;
    loseResult.textContent = `Lost: 0`;
    drawResult.textContent = `Draw: 0`;
    
    // Safely remove elements if present
    playAgainButton.remove();
    matchResult.remove();
    
    enablePlayerButtons();

    playerContainer.replaceChildren(rockButton, paperButton, scissorsButton);
    enemyContainer.replaceChildren(enemyRockButton, enemyPaperButton, enemyScissorsButton);
}

function gameResult() {
    if (winScore === 5 || loseScore === 5) {
        if (winScore === 5) {
            gameOverResult.setAttribute("id", "win-score");
            gameOverResult.textContent = "Congratulations!\nYou win!";
        } else {
            gameOverResult.setAttribute("id", "lose-score");
            gameOverResult.textContent = "You lost!\nTry again next time!";
        }
        
        if (!gameOverModalContainer.contains(gameOverResult)) {
            gameOverModalContainer.insertBefore(gameOverResult, startOverButton);
        }
        gameOverModal.classList.add("show");
    }
}

function displayMatchResult(result) {
    if (result === "Win") {
        matchResult.setAttribute("id", "win-score");
        matchResult.textContent = `You ${result}!`;
    } else if (result === "Lose") {
        matchResult.setAttribute("id", "lose-score");
        matchResult.textContent = `You ${result}!`;
    } else {
        matchResult.setAttribute("id", "draw-score");
        matchResult.textContent = `It's a Tie!`;
    }
    resultContainer.insertBefore(matchResult, scoresContainer);
    gameResult();
}

rockButton.addEventListener("click", () => {
    displayMatchResult(playerSelection("Rock"));
});
paperButton.addEventListener("click", () => {
    displayMatchResult(playerSelection("Paper"));
});
scissorsButton.addEventListener("click", () => {
    displayMatchResult(playerSelection("Scissors"));
});

playAgainButton.addEventListener("click", () => {
    playAgainButton.remove();
    matchResult.remove();

    enablePlayerButtons();

    playerContainer.replaceChildren(rockButton, paperButton, scissorsButton);
    enemyContainer.replaceChildren(enemyRockButton, enemyPaperButton, enemyScissorsButton);
});

startOverButton.addEventListener("click", handleStartOverButton);