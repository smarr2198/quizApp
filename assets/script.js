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
      //loseGame();
    }
  }, 1000);
}

const questions = [
  {
    title: "What is David Blaines first Name",
    answersA: "David",
    answersB: "Jeff",
    answersC: "Jack",
    correct: "David",
  },
  {
    title: "What is David Blaines Last Name",
    answersA: "Blaine",
    answersB: "Angel",
    answersC: "Jefferson",
    correct: "Blaine",
  },
  {
    title: "What is David Blaines Profession",
    answersA: "Clown",
    answersB: "Software Dev",
    answersC: "Magician",
    correct: "Magician",
  },
];

function startGame() {
  questionDiv.innerHTML = questions[i].title;

  answersBtnA.innerHTML = questions[i].answersA;
  answersBtnB.innerHTML = questions[i].answersB;
  answersBtnC.innerHTML = questions[i].answersC;
}
function recordHighScore() {
  const highScores =
    JSON.parse(window.localStorage.getItem("highScores")) || [];
  highScore = timerCount - 1;
  const initials = prompt("Enter your intials");
  let userScore = {
    score: highScore,
    initials: initials,
  };
  highScores.push(userScore);
  window.localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScore();
}
function displayHighScore() {
  const highScores = JSON.parse(window.localStorage.getItem("highScores"));
  highScores.forEach((score) => {
    highScoreDiv.innerHTML += `${score.initials}: ${score.score}`;
  });
}

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
