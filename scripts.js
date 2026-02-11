function getUserName() {
  const blank = document.getElementById('userName').value.trim();
  return blank === "" ? "guest" : blank;
}

function welcomeMessage() {
  const userName = getUserName();
  localStorage.setItem("rpsUsername", userName); // had to google how to use this to make the username stay across the pages
  const message = `welcome, ${userName}!`;
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

const username = localStorage.getItem("rpsUsername") || "guest";
const nameEl = document.getElementById("username");

if (nameEl) {
  nameEl.textContent = username;
}

// AI helped me with this part because I wasn't sure how to implement the HP system onto the game page. 
// Having best of 5 and best of 3 gamemodes was not necessary for the project so I think it should be fine if I used AI for this part

let numberOfTurns = 3;
const HEART = "\u2764\ufe0f";

const makeHearts = (count) => HEART.repeat(count);

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

// end of AI code


const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');

if (rockBtn && paperBtn && scissorsBtn) {
  rockBtn.addEventListener('click', () => playRound("rock"));
  paperBtn.addEventListener('click', () => playRound("paper"));
  scissorsBtn.addEventListener('click', () => playRound("scissors"));
}


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

let userWins = 0;
let computerWins = 0;

const addUserWins = () => {
  userWins++;
};

const addComputerWins = () => {
  computerWins++;
};

let userHP;
let computerHP;

const startGame = () => {
  userHP = numberOfTurns;
  computerHP = numberOfTurns;
  updateHpDisplay();
};

const updateHpDisplay = () => {
  document.getElementById("userHealth").textContent = makeHearts(userHP);
  document.getElementById("computerHealth").textContent = makeHearts(computerHP);
};

const playRound = (userChoice) => {
  const computerChoice = getComputerChoice();
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

  const result = determineWinner(userChoice, computerChoice);

  if (result === "You win!") {
    computerHP--;
  } else if (result === "You lose!") {
    userHP--;
  }

  updateHpDisplay();
  displayResult(result);

  checkGameOver();
};

const checkGameOver = () => {
  if (userHP === 0) {
    // user lost
    window.location.href = "lose.html";
  } else if (computerHP === 0) {
    // user won
    window.location.href = "win.html";
  }
};

if (document.getElementById("userHealth")) {
  startGame();
}

function displayResult(result) {
  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.textContent = result;
  }
}

function finalScoreDisplay() {
  const finalScoreEl = document.getElementById('finalScore');
  if (finalScoreEl) {
    finalScoreEl.textContent = `final score: ${userWins} - ${computerWins}`;
  }
}

const playAgainBtn = document.getElementById('playAgainBtn');
if (playAgainBtn) {
  playAgainBtn.addEventListener('click', () => {
    localStorage.removeItem("rpsBestOf");
    window.location.href = "index.html";

  });
}