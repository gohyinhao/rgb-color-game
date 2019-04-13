// constants
var numOfColorsInHardMode = 6;
var numOfColorsInEasyMode = 3;
var mainBackgroundColor = "#232323";
var titleBackgroundColor = "steelblue";

// selectors
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var colorDisplaySelector = document.querySelector("#colorDisplay");
var titleSelector = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");

// initialize game
var goalColor;
var colors = [];
init();

// function to initialize game.
function init() {
  initSquares();
  initEasyButton();
  initHardButton();
  initResetButton();
  resetGame(numOfColorsInHardMode);
}

// Add event listeners for squares.
function initSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function () {
      if (this.style.backgroundColor === goalColor) {
        messageDisplay.textContent = "Correct!";
        changeColorForAllSquares(goalColor);
        titleSelector.style.backgroundColor = goalColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = mainBackgroundColor;
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

// function to add event listener for reset button.
function initResetButton() {
  resetButton.addEventListener("click", function () {
    if (easyButton.classList.contains("selected")) {
      resetGame(numOfColorsInEasyMode);
    } else {
      resetGame(numOfColorsInHardMode);
    }
  });
}

// function to add event listener for easy button.
function initEasyButton() {
  easyButton.addEventListener("click", function () {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    resetGame(numOfColorsInEasyMode);
  });
}

// function to add event listener for hard button.
function initHardButton() {
  hardButton.addEventListener("click", function () {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    resetGame(numOfColorsInHardMode);
  });
}

// function to change color of all squares to {@param color}.
function changeColorForAllSquares(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// function to randomly pick a color among all the different colors in colors array.
function pickColor() {
  var randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
}

// function to randomly generate a color.
function generateRandomColor() {
  var randomNumberForRed = Math.floor(Math.random() * 256);
  var randomNumberForGreen = Math.floor(Math.random() * 256);
  var randomNumberForBlue = Math.floor(Math.random() * 256);

  return "rgb(" + randomNumberForRed + ", " + randomNumberForGreen + ", " + randomNumberForBlue + ")";
}

// function to randomly generate array of colors.
// size of array is dependent on {@param: numberOfColors}.
function generateRandomColors(numberOfColors) {
  var colors = [];
  while (numberOfColors-- > 0) {
    colors.push(generateRandomColor());
  }

  return colors;
}

// function to re-initialize the game.
// {@param: numOfSquares} determine whether it is hard mode or easy mode.
// numOfSquares = 3 (easy mode) or numOfSquares = 6 (hard mode).
function resetGame(numOfSquares) {
  colors = generateRandomColors(numOfSquares);
  goalColor = pickColor();
  colorDisplaySelector.textContent = goalColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";

  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }

  titleSelector.style.backgroundColor = titleBackgroundColor;
}

