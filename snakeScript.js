const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const body = document.body;
canvas.style.boxShadow = 'black 20px 10px 50px';

class SnakeBits {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };
};

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let snakeX = 10;
let snakeY = 10;
const snakeBits = [];
let snakeLength = 2;
let appleX = 5;
let appleY = 5;
let xSpeed = 0;
let ySpeed = 0;

function gameMotion() {
  clearScreen();
  updateSnakePosition();
  checkAppleColision();
  drawApple();
  drawSnake();
  setTimeout(gameMotion, 1000/speed);
};

function clearScreen() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

function drawSnake() {
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
  };
};

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

body.addEventListener('keydown', keyDown);

gameMotion();
