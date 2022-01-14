const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const questionDiv = document.getElementById("question");
const answersBtnA = document.getElementById("answersA");
const answersBtnB = document.getElementById("answersB");
const answersBtnC = document.getElementById("answersC");
let highScoreDiv = document.querySelector("#scores");
let highScore = [];
let hasWon = false;
let timerElement = document.querySelector("#timer");
let i = 0;
let timer;
let timerCount = 20;
let score = 0;

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount >= 0) {
      // Tests if win condition is met
      if (hasWon && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        //winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      recordHighScore();
      //loseGame();
    }
  }, 1000);
}
// array of questions and answers that will trigger when start game button is hit
const questions = [
  {
    title: "Inside which HTML element do we link the JavaScript?",
    answersA: "script",
    answersB: "js",
    answersC: "a",
    correct: "script",
  },
  {
    title: "How do you write HelloWorld in an alert box?",
    answersA: "msg('HelloWolrd')",
    answersB: "alert('HelloWorld')",
    answersC: "alertBox('HelloWorld')",
    correct: "alert('HelloWorld')",
  },
  {
    title: "How do you create a function in JavaScript?",
    answersA: "function:myFunction()",
    answersB: "function=myFunction()",
    answersC: "function myFunction()",
    correct: "function myFunction()",
  },
];
// this function is linked to the startGameBtn and will initialize the questions array
function startGame() {
  questionDiv.innerHTML = questions[i].title;

  answersBtnA.innerHTML = questions[i].answersA;
  answersBtnB.innerHTML = questions[i].answersB;
  answersBtnC.innerHTML = questions[i].answersC;

  startBtn.style.visibility = "hidden";
}
// this function will record your score to local storage
function recordHighScore() {
  const highScores =
    JSON.parse(window.localStorage.getItem("highScores")) || [];
  highScore = timerCount;
  const initials = prompt("Enter your intials");
  let userScore = {
    score: highScore,
    initials: initials,
  };
  highScores.push(userScore);
  window.localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScore();
}
// displays high score on website page in order from highest score to lowest score with users initials
function displayHighScore() {
  const highScores = JSON.parse(window.localStorage.getItem("highScores"));
  highScores.sort((a, b) => (a.score > b.score ? -1 : 1));
  highScores.forEach((score) => {
    highScoreDiv.innerHTML += `(${score.initials}:${score.score})    `;
  });
}
// event listeners
startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", function () {
  location.reload();
});

answersBtnA.addEventListener("click", function () {
  if (questions[i].correct === questions[i].answersA) {
    alert("You are correct");
    ++i;
    startGame();
  } else {
    alert("Incorrect -2 on time");
    --timerCount;
  }
});
answersBtnB.addEventListener("click", function () {
  if (questions[i].correct === questions[i].answersB) {
    alert("You are correct");
    ++i;
    startGame();
  } else {
    alert("Incorrect -2 on time");
    --timerCount;
  }
});
answersBtnC.addEventListener("click", function () {
  if (questions[i].correct === questions[i].answersC) {
    alert("You are correct");
    ++i;
    hasWon = true;
    recordHighScore();
  } else {
    alert("Incorrect -2 on time");
    --timerCount;
  }
});
