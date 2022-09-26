const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const body = document.body;
const playAgainBtn = document.getElementById('playAgainBtn');
const upBtn = document.getElementById('upBtn');
const rightBtn = document.getElementById('rightBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');

canvas.style.boxShadow = 'black 20px 10px 50px';

playAgainBtn.addEventListener('click', () => {
  speed = 4;
  snakeX = 7;
  snakeY = 7;
  snakeBits = [];
  snakeLength = 2;
  appleX = 5;
  appleY = 5;
  xSpeed = 0;
  ySpeed = 0;
  score = 0;
  gameMotion();
  playAgainBtn.disabled = true;
});

class SnakeBit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };
};

let randomApplePosition = Math.floor(Math.random() * 15);

let speed = 4;
let tileCount = 15;
let tileSize = canvas.width / tileCount - 2;
let snakeX = 7;
let snakeY = 7;
let snakeBits = [];
let snakeLength = 2;
let appleX = randomApplePosition;
let appleY = randomApplePosition;
let xSpeed = 0;
let ySpeed = 0;
let score = 0;

function gameMotion() {
  updateSnakePosition();
  const result = isGameOver();
  if (result) return;
  clearScreen();
  checkAppleColision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(gameMotion, 1000/speed);
};

function clearScreen() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

function drawSnake() {
  context.fillStyle = 'green';
  for (let i = 0; i < snakeBits.length; i++) {
    let bit = snakeBits[i];
    context.fillRect(bit.x * tileCount, bit.y * tileCount, tileSize, tileSize);
  };
  snakeBits.push(new SnakeBit(snakeX, snakeY));
  if (snakeBits.length > snakeLength) {
    snakeBits.shift();
  };

  context.fillStyle = 'orange';
  context.fillRect(snakeX * tileCount, snakeY * tileCount, tileSize, tileSize);
};

function updateSnakePosition() {
  snakeX += xSpeed;
  snakeY += ySpeed;
};

function drawApple() {
  context.fillStyle = 'red';
  context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};

function checkAppleColision() {
  if (appleX === snakeX && appleY === snakeY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    snakeLength += 1;
    score += 10;
    speed += 0.5;
  };
};

leftBtn.addEventListener("click", () => {
  if (xSpeed === 1) return;
    ySpeed = 0;
    xSpeed = -1;
});

upBtn.addEventListener("click", () => {
  if (ySpeed === 1) return;
    ySpeed = -1;
    xSpeed = 0;
});

rightBtn.addEventListener("click", () => {
  if (xSpeed === -1) return;
    ySpeed = 0;
    xSpeed = 1;
});

downBtn.addEventListener("click", () => {
  if (ySpeed === -1) return;
    ySpeed = 1;
    xSpeed = 0;
});


function keyDown(event) {
  const leftKeyCode = 37;
  const upKeyCode = 38;
  const rightKeyCode = 39;
  const downKeyCode = 40;

  if (event.keyCode === leftKeyCode) {
    if (xSpeed === 1) return;
    ySpeed = 0;
    xSpeed = -1;
  };

  if (event.keyCode === upKeyCode) {
    if (ySpeed === 1) return;
    ySpeed = -1;
    xSpeed = 0;
  };

  if (event.keyCode === rightKeyCode) {
    if (xSpeed === -1) return;
    ySpeed = 0;
    xSpeed = 1;
  };
  
  if (event.keyCode === downKeyCode) {
    if (ySpeed === -1) return;
    ySpeed = 1;
    xSpeed = 0;
  };
};

function drawScore() {
  context.fillStyle = 'white';
  context.font = '15px Verdana';
  context.fillText(`Score: ${score}`, 5, 15);
};

function isGameOver() {
  let gameOver = false;

  if (xSpeed === 0 && ySpeed === 0) return false;

  if (snakeX < 0) gameOver = true;
  if (snakeX === tileCount) gameOver = true;
  if (snakeY < 0) gameOver = true;
  if (snakeY === tileCount) gameOver = true;

  for (let i = 0; i < snakeBits.length; i+= 1) {
    let part = snakeBits[i];
    if (part.x === snakeX && part.y === snakeY) {
      gameOver = true;
      break;
    };
  };

  if (gameOver) {
    context.font = '20px Verdana';
    context.fillText('Game Over!', canvas.width / 5.6, canvas.height / 2);
    playAgainBtn.disabled = false;
  };

  return gameOver;
}

body.addEventListener('keydown', keyDown);

gameMotion();
