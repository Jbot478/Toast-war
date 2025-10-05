const toastEl = document.getElementById("toast");
const monsterEl = document.getElementById("monster");
const gameEl = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;

// Initial positions
let toast = { x: 180, y: 150 };
let monster = { x: 50, y: 50 };
let butter = { x: 300, y: 100 };

// Speeds
const toastSpeed = 20;
const monsterSpeed = 2;

// Create butter element dynamically
const butterEl = document.createElement("div");
butterEl.id = "butter";
butterEl.textContent = "🧈";
gameEl.appendChild(butterEl);

// Move toast with arrow keys
document.addEventListener("keydown", (e) => {
  switch(e.key) {
    case "ArrowUp": toast.y -= toastSpeed; break;
    case "ArrowDown": toast.y += toastSpeed; break;
    case "ArrowLeft": toast.x -= toastSpeed; break;
    case "ArrowRight": toast.x += toastSpeed; break;
  }
  keepInsideGame(toast);
  updatePositions();
  checkButterCollision();
});

// Keep toast inside the game area
function keepInsideGame(obj) {
  const width = gameEl.offsetWidth;
  const height = gameEl.offsetHeight;
  obj.x = Math.max(0, Math.min(obj.x, width - 40));
  obj.y = Math.max(0, Math.min(obj.y, height - 40));
}

// Update element positions
function updatePositions() {
  toastEl.style.left = toast.x + "px";
  toastEl.style.top = toast.y + "px";
  monsterEl.style.left = monster.x + "px";
  monsterEl.style.top = monster.y + "px";
  butterEl.style.left = butter.x + "px";
  butterEl.style.top = butter.y + "px";
}

// Move monster toward toast
function moveMonster() {
  if (monster.x < toast.x) monster.x += monsterSpeed;
  if (monster.x > toast.x) monster.x -= monsterSpeed;
  if (monster.y < toast.y) monster.y += monsterSpeed;
  if (monster.y > toast.y) monster.y -= monsterSpeed;

  checkMonsterCollision();
  updatePositions();
}

// Collision detection with monster = game over
function checkMonsterCollision() {
  if (Math.abs(monster.x - toast.x) < 40 && Math.abs(monster.y - toast.y) < 40) {
    alert("Game Over! Toast got caught by jam 🥫");
    resetPositions();
  }
}

// Collision detection with butter = win
function checkButterCollision() {
  if (Math.abs(butter.x - toast.x) < 40 && Math.abs(butter.y - toast.y) < 40) {
    alert("You win! Toast got the butter 🧈!");
    resetPositions();
  }
}

// Reset positions and score
function resetPositions() {
  toast = { x: 180, y: 150 };
  monster = { x: 50, y: 50 };
  butter = { 
    x: Math.floor(Math.random() * (gameEl.offsetWidth - 40)), 
    y: Math.floor(Math.random() * (gameEl.offsetHeight - 40)) 
  };
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
  updatePositions();
}

// Run monster movement every 30ms
setInterval(moveMonster, 30);

// Initial update
updatePositions();
