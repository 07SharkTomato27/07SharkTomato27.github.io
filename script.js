let score = 0;
let autoClickers = 0;
let autoClickSpeed = 1000;
let autoClickInterval;
let mathBonus = 1;
let gradientBought = false;
let thooasList = [];
let tenaActive = false;
const upgrades = {
  1: { price: 10 },
  2: { price: 50 },
  3: { price: 555 },
  4: { price: 1000 },
  5: { price: 30 },
  6: { price: 3 },
  7: { price: 100 }
};

const counter = document.getElementById("counter");
const clickBtn = document.getElementById("click-btn");
const mathBox = document.getElementById("math-question");
const clickSound = document.getElementById("click-sound");
const bounceSound = document.getElementById("thooas-bounce");
const moveSound = document.getElementById("thooas-move");
const clickThooasSound = document.getElementById("thooas-click");

clickBtn.addEventListener("click", () => {
  score += tenaActive ? 4 : 1;
  updateScore();
  clickSound.play();
});

function updateScore() {
  counter.textContent = "スコア: " + score;
  updateUpgrades();
}

function updateUpgrades() {
  for (const id in upgrades) {
    const btn = document.getElementById("upgrade" + id);
    if (score >= upgrades[id].price) btn.classList.add("show");
  }
}

function buyUpgrade(id) {
  if (score < upgrades[id].price) return;
  score -= upgrades[id].price;
  switch (id) {
    case 1:
      autoClickers++;
      if (!autoClickInterval) {
        autoClickInterval = setInterval(() => {
          score += autoClickers;
          updateScore();
        }, autoClickSpeed);
      }
      upgrades[id].price = Math.ceil(upgrades[id].price * 1.3);
      break;
    case 2:
      if (autoClickSpeed > 100) {
        clearInterval(autoClickInterval);
        autoClickSpeed = Math.max(100, autoClickSpeed - 200);
        autoClickInterval = setInterval(() => {
          score += autoClickers;
          updateScore();
        }, autoClickSpeed);
      }
      upgrades[id].price = Math.ceil(upgrades[id].price * 1.3);
      break;
    case 3:
      document.getElementById("upgrade3").style.display = "none";
      mathBox.style.display = "block";
      showMathProblem();
      break;
    case 4:
      mathBonus += 1;
      upgrades[id].price = Math.ceil(upgrades[id].price * 1.3);
      break;
    case 5:
      document.body.style.background = "linear-gradient(to right, #00f, #0ff)";
      document.getElementById("upgrade5").style.display = "none";
      gradientBought = true;
      break;
    case 6:
      spawnThooas();
      upgrades[id].price = Math.ceil(upgrades[id].price * 1.3);
      break;
    case 7:
      document.getElementById("upgrade7").style.display = "none";
      tenaActive = true;
      const tenaImg = document.createElement("img");
      tenaImg.src = "image/spaceclicker/tena.gif";
      tenaImg.classList.add("tena");
      document.getElementById("tena-container").appendChild(tenaImg);
      break;
  }
  updateScore();
}

function showMathProblem() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  const answer = a + b;
  mathBox.textContent = `${a} + ${b} = ?`;
  const input = document.createElement("input");
  input.type = "number";
  input.style.marginLeft = "10px";
  mathBox.appendChild(input);
  input.focus();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const userAnswer = parseInt(input.value);
      if (userAnswer === answer) {
        score += 30 * mathBonus;
        updateScore();
      }
      input.remove();
      setTimeout(showMathProblem, 500);
    }
  });
}

function spawnThooas() {
  const container = document.getElementById("thooas-container");
  const thooas = document.createElement("div");
  thooas.classList.add("thooas");
  container.appendChild(thooas);
  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 50);
  let vx = 3;
  let vy = 2;
  let speedMultiplier = 1;
  moveSound.play();
  thooas.style.left = `${x}px`;
  thooas.style.top = `${y}px`;
  thooas.addEventListener("click", () => {
    speedMultiplier *= 2;
    clickThooasSound.currentTime = 0;
    clickThooasSound.play();
  });
  function move() {
    x += vx * speedMultiplier;
    y += vy * speedMultiplier;
    if (x <= 0 || x + 100 >= window.innerWidth) {
      vx *= -1;
      bounce();
    }
    if (y <= 0 || y + 50 >= window.innerHeight) {
      vy *= -1;
      bounce();
    }
    thooas.style.left = `${x}px`;
    thooas.style.top = `${y}px`;
    requestAnimationFrame(move);
  }
  function bounce() {
    score += 2;
    bounceSound.currentTime = 0;
    bounceSound.play();
    updateScore();
  }
  move();
}

function resetGame() {
  location.reload();
}

updateScore();
