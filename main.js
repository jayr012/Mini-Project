/* ========== NAVIGATION CONTROL ========== */
function showHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("projectCards").style.display = "none";
  hideAllSections();
}
function showProjects() {
  document.getElementById("home").style.display = "none";
  document.getElementById("projectCards").style.display = "block";
}
function hideAllSections() {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
}
function showSection(id) {
  hideAllSections();
  document.getElementById(id).style.display = "block";
  window.scrollTo({ top: 250, behavior: 'smooth' });
}

/* ========== BMI JS ========== */
function calculateBMI() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  if (weight === "" || height === "") { alert("Please fill up all fields."); return; }
  let bmi = weight / (height * height);
  let message = bmi < 18.5 ? "Underweight" :
                bmi < 25 ? "Normal" :
                bmi < 30 ? "Overweight" : "Obese";
  document.getElementById("result").innerHTML =
    "Your BMI is " + bmi.toFixed(2) + " (" + message + ")";
}

/* ========== ROCK JS ========== */
const userChoiceText = document.getElementById("userChoice");
const computerChoiceText = document.getElementById("computerChoice");
const message = document.getElementById("message");
const playAgainButton = document.getElementById("playAgain");
const choices = ["rock", "paper", "scissors"];

function play(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  userChoiceText.textContent = "You chose: " + userChoice;
  computerChoiceText.textContent = "Computer chose: " + computerChoice;
  if (userChoice === computerChoice) message.textContent = "🤝 It's a tie!";
  else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) message.textContent = "🎉 You win!";
  else message.textContent = "💻 Computer wins!";
  playAgainButton.style.display = "inline-block";
}
function resetGame() {
  userChoiceText.textContent = "";
  computerChoiceText.textContent = "";
  message.textContent = "";
  playAgainButton.style.display = "none";
}

/* ========== GUESSING GAME JS ========== */
let secretNumber, maxAttempts, attemptsLeft, maxRange;
let wins = 0, losses = 0, gameOver = false;

function setDifficulty() {
  let diff = document.getElementById("difficulty").value;
  maxRange = diff === "easy" ? 10 : diff === "medium" ? 50 : 100;
  maxAttempts = diff === "easy" ? 5 : diff === "medium" ? 7 : 10;
  startGame();
}
function startGame() {
  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  attemptsLeft = maxAttempts;
  gameOver = false;
  document.getElementById("message").textContent = "🎮 Game started!";
  document.getElementById("rangeText").textContent = `Guess the number between 1 and ${maxRange}`;
  document.getElementById("attemptsLeft").textContent = `Attempts left: ${attemptsLeft}`;
  document.getElementById("guessInput").value = "";
}
function checkGuess() {
  if (gameOver) return;
  let guess = parseInt(document.getElementById("guessInput").value);
  if (isNaN(guess)) return document.getElementById("message").textContent = "⚠️ Enter a number!";
  attemptsLeft--;
  if (guess < secretNumber) document.getElementById("message").textContent = "📉 Too low!";
  else if (guess > secretNumber) document.getElementById("message").textContent = "📈 Too high!";
  else { document.getElementById("message").textContent = "🎉 Correct!"; wins++; gameOver = true; updateScore(); return; }
  if (attemptsLeft <= 0) { 
    document.getElementById("message").textContent=`💀 Game Over! Correct: ${secretNumber}`; 
    losses++; 
    gameOver = true; 
  }
  document.getElementById("attemptsLeft").textContent = `Attempts left: ${attemptsLeft}`;
}
function updateScore() { 
  document.getElementById("wins").textContent = wins; 
  document.getElementById("losses").textContent = losses; 
}
function restartGame() { startGame(); }

setDifficulty();
