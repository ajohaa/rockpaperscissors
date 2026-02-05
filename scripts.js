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

const choices = ["rock", "paper", "scissors"];

const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();
  if (
    userInput === "rock" ||
    userInput === "paper" ||
    userInput === "scissors"
  ) {
    return userInput;
  } else {
    console.log("Error!");
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

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "The game is a tie!";
  }
  if (userChoice === "rock") {
    if (computerChoice === "paper") {
      return "Computer won.";
    } else {
      return "You won!";
    }
  }

  if (userChoice === "paper") {
    if (computerChoice === "scissors") {
      return "Computer won.";
    } else {
      return "You won!";
    }
  }

  if (userChoice === "scissors") {
    if (computerChoice === "rock") {
      return "Computer won.";
    } else {
      return "You won!";
    }
  }
};

const playGame = () => {
  const userChoice = getUserChoice("scissors");
  const computerChoice = getComputerChoice();
  console.log(`You chose: ${userChoice}.`);
  console.log(`Computer chose: ${computerChoice}.`);

  console.log(determineWinner(userChoice, computerChoice));
};

playGame();
