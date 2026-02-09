function getUserName() {
  const blank = document.getElementById('userName').value.trim();
  return blank === "" ? "guest" : blank;
}

function welcomeMessage() {
  const userName = getUserName();
  const message = `welcome, ${userName}, to rock-paper-scissors!`;
  const el = document.getElementById('welcomeMessage');
  if (!el) return;
  // restart animation if it was already applied
  el.classList.remove('fade-in');
  void el.offsetWidth; // force reflow to restart CSS animation
  el.innerText = message;
  el.classList.add('fade-in');
}

// Attach click handler so the submit button updates the welcome message
const generateBtn = document.getElementById('generateBtn');
if (generateBtn) {
  generateBtn.addEventListener('click', function (event) {
    event.preventDefault();
    welcomeMessage();
  });
}


// I want the number of turns to depend on whether the user clicked 'best of 3' or 'best of 5'. For best of 3, the game should put 3 hearts in HP. If best of 5, the game should put 5 hearts in HP. I also want the game to remove a heart from the user's HP if they lose a round, and remove a heart from the computer's HP if they win a round. The game should end when either the user or computer loses all their hearts, and display a message saying who won.

// AI helped me with this part because I wasn't sure how to implement the HP system onto the game page

let numberOfTurns = 3;
const HEART = "\u2764\ufe0f";

const makeHearts = (count) => HEART.repeat(count);

const updateHpDisplay = (count) => {
  const userEl = document.getElementById("userHealth");
  const computerEl = document.getElementById("computerHealth");
  if (userEl) userEl.textContent = makeHearts(count);
  if (computerEl) computerEl.textContent = makeHearts(count);
};

const bestOfThreeBtn = document.getElementById("bestOfThree");
if (bestOfThreeBtn) {
  bestOfThreeBtn.addEventListener("click", function () {
    numberOfTurns = 3;
    localStorage.setItem("rpsBestOf", "3");
  });
}

const bestOfFiveBtn = document.getElementById("bestOfFive");
if (bestOfFiveBtn) {
  bestOfFiveBtn.addEventListener("click", function () {
    numberOfTurns = 5;
    localStorage.setItem("rpsBestOf", "5");
  });
}

const savedBestOf = localStorage.getItem("rpsBestOf");
if (savedBestOf === "5") {
  numberOfTurns = 5;
}
updateHpDisplay(numberOfTurns);

// end of AI code


const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');

rockBtn.addEventListener('click', function () { playRound("rock") });
paperBtn.addEventListener('click', function () { playRound("paper") });
scissorsBtn.addEventListener('click', function () { playRound("scissors") });


const playerChoices = [rockBtn, paperBtn, scissorsBtn];

const computerChoices = ["rock", "paper", "scissors"];

const getUserChoice = (btn) => {
  if (btn === rockBtn) {
    return "rock";
  } else if (btn === paperBtn) {
    return "paper";
  } else if (btn === scissorsBtn) {
    return "scissors";
  }
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
};

const playRound = (userChoice) => {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);
  console.log(`You chose: ${userChoice}.`);
  console.log(`Computer chose: ${computerChoice}.`);
  console.log(result);
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  } else if ((userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")) {
    return "You win!";
  } else {
    return "You lose!";
  }
};

function displayResult(result) {
  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.textContent = result;
  }
} 