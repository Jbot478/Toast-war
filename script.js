const toast = document.getElementById("toast");
const monster = document.getElementById("monster");
const scoreDisplay = document.getElementById("score");
let score = 0;

let toastPosition = 180;
let monsterPosition = 50;
let direction = 1;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && toastPosition > 0) {
    toastPosition -= 20;
  }
  if (e.key === "ArrowRight" && toastPosition < 360) {
    toastPosition += 20;
  }
  toast.style.left = toastPosition + "px";
});

function moveMonster() {
  monsterPosition += 10 * direction;
  if (monsterPosition > 360 || monsterPosition < 0) {
    direction *= -1;
  }
  monster.style.left = monsterPosition + "px";

  // check collision
  if (
    monsterPosition < toastPosition + 40 &&
    monsterPosition + 40 > toastPosition
  ) {
    alert("Game Over! Toast got buttered! 🧈😵");
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    toastPosition = 180;
    monsterPosition = 50;
  } else {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
}

setInterval(moveMonster, 500);
