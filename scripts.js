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

// I want the number of turns to depend on whether the user clicked 'best of 3' or 'best of 5'. For best of 3, the game should put 3 hearts in HP. If best of 5, the game should put 5 hearts in HP. I also want the game to remove a heart from the user's HP if they lose a round, and remove a heart from the computer's HP if they win a round. The game should end when either the user or computer loses all their hearts, and display a message saying who won.

const numberOfTurns = 3; // default to best of 3, will update based on user selection
if (document.getElementById('bestOfThree')) {
  document.getElementById('bestOfThree').addEventListener('click', function() {
    numberOfTurns = 3;
    // update HP display to show 3 hearts
    userHealth = `❤️❤️❤️`;
    computerHealth = `❤️❤️❤️`; 
  });
} else if (document.getElementById('bestOfFive')) {
    document.getElementById('bestOfFive').addEventListener('click', function() {
      numberOfTurns = 5;
      userHealth = `❤️❤️❤️❤️❤️`;
      computerHealth = `❤️❤️❤️❤️❤️`;
    });
  }


// bro i do not know how to code
// i may be cooked

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
