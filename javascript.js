function getComputerChoice() {
    let computerChoice = Math.floor((Math.random() * 3) + 1);
    if (computerChoice == 1) {
        return "Rock"
    }

    else if (computerChoice == 2) {
        return "Paper"
    }

    else if (computerChoice == 3) {
        return "Scissors"
    }

    return computerChoice
}

function getHumanChoice() {
    let humanChoice = prompt("Enter Rock, Paper, Scissors: ");
    humanChoice = humanChoice[0].toUpperCase() + humanChoice.slice(1).toLowerCase();
    return humanChoice
}

function playGame() {
    function playRound(humanChoice, computerChoice) {
        if (humanChoice == computerChoice) {
            console.log(`It's a tie! Player: ${humanChoice}, Computer: ${computerChoice}`)
            return "Tie"
        }

        else if (humanChoice == 'Rock' && computerChoice == 'Paper' || humanChoice == 'Paper' && computerChoice == 'Scissors' || humanChoice == 'Scissors' && computerChoice == 'Rock') {
            console.log(`You lost! Player: ${humanChoice}, Computer: ${computerChoice}`)
            computerScore++
            return
        }

        else {
            console.log(`You win! Player: ${humanChoice}, Computer: ${computerChoice}`)
            humanScore++
            return
        }
    }
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        console.log(`Current scores: Player: ${humanScore}, Computer: ${computerScore}`)

    }

    if (humanScore == computerScore) {
        console.log("Game over! It's a tie!");
    }
    else if (humanScore < computerScore) {
        console.log("Game over! You lose!");

    }

    else
        console.log("Congratulations! You win!");
}


playGame()