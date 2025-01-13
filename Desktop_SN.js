class cordi {
  constructor(y, x) {
    this.x = x; // column
    this.y = y; // row
  }
}
//import Audios:-
const gameOverAudio = new Audio("./gameOver.mp3");
const clickAudio = new Audio("./click.mp3");
const EatAudio = new Audio("./eat.mp3");
const ResetAudio = new Audio("./reset.mp3");
clickAudio.volume = 0.5;
ResetAudio.volume = 0.2;
// console.log(gameOverAudio);
// console.log(clickAudio);
// console.log(EatAudio);
//helper functions to help other function :-
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function animateScale(myDiv) {
  myDiv.style.animation = "scaleUpDown 1s cubic-bezier(0, 0.73, 0.09, 1) 1"; // Run only once
  // Remove animation property after it ends
  myDiv.addEventListener("animationend", () => {
    myDiv.style.animation = "";
  });
}
function tempStopListner(timeout) {
  //helper
  // Remove the event listener
  document.removeEventListener("keydown", OnPress);
  // console.log("Event Listner Removed .");
  // Re-add the event listener after the timeout
  setTimeout(() => {
    document.addEventListener("keydown", OnPress);
    // console.log("Event Listner Added Back .");
  }, timeout);
}
function OnPress(event) {
  //helper
  // Use the `key` property to determine the key pressed
  // snake = Board.children;
  switch (event.key) {
    case "ArrowUp":
      if (direction != "down") {
        clickAudio.play();
        direction = "up";
        Direc.innerHTML = "Up";
      }
      tempStopListner(150);
      break;
    case "ArrowDown":
      if (direction != "up") {
        clickAudio.play();
        direction = "down";
        Direc.innerHTML = "Down";
      }
      tempStopListner(150);
      break;
    case "ArrowLeft":
      if (direction != "right") {
        clickAudio.play();
        direction = "left";
        Direc.innerHTML = "Left";
      }
      tempStopListner(150);
      break;
    case "ArrowRight":
      if (direction != "left") {
        clickAudio.play();
        direction = "right";
        Direc.innerHTML = "Right";
      }
      tempStopListner(150);
      break;
    default:
    // direction = "none";
  }
}

// function's :-
function moveSnake(head) {
  switch (direction) {
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "none":
      head.x = BoardSize / 2;
      head.y = BoardSize / 2;
      break;
    default:
  }
}
function GameOver() {
  if (direction === "none") return false;
  snake = Board.children;
  const n = snake.length;
  if (head.x > BoardSize || head.x < 1 || head.y > BoardSize || head.y < 1)
    return true;
  for (let i = 1; i < n; i++) {
    if (
      snake[i].style.gridRow == head.y &&
      snake[i].style.gridColumn == head.x
    ) {
      return true;
    }
  }

  return false;
}

// varables :-
let direction; // left , right ,up ,down ,none
let snake;
let intervalID;
const BoardSize = 30;
const reset = document.querySelector(".reset");
const game_over = document.querySelector(".gameover");
const Direc = document.querySelector(".direction");
const Board = document.querySelector("#Board");
const score = document.getElementById("score");
const head = new cordi(10, 10); //  head .
const fruit = new cordi(
  Math.floor(Math.random() * BoardSize) + 1,
  Math.floor(Math.random() * BoardSize) + 1
);
// Listner's :-
document.addEventListener("keydown", OnPress);
reset.addEventListener("click", run);

function SetUp() {
  game_over.style.animation = ""; // Run inifinite off
  reset.style = "display:none;";
  game_over.style = "display:none;";
  direction = "none";
  score.style.display = "none";
  // Direc.style.display = "none";
  Direc.innerHTML = "Press Arrow Keys";
  Direc.style.display = "block";
  score.innerHTML = "Score : 0";
  head.x = BoardSize / 2;
  head.y = BoardSize / 2;
  fruit.x = Math.floor(Math.random() * BoardSize) + 1;
  fruit.y = Math.floor(Math.random() * BoardSize) + 1;
  //clear Board :-
  while (Board.firstChild) {
    Board.removeChild(Board.firstChild);
  }
  //Creating New Initial Fruit :-
  const new_divF = document.createElement("div");
  new_divF.style.gridColumn = fruit.x;
  new_divF.style.gridRow = fruit.y;
  new_divF.style.backgroundColor = "rgb(9, 255, 0)"; // Green fruit
  new_divF.style.border = "none";
  Board.prepend(new_divF); // HTML render
  // Creating Initial Head :-
  snake = Board.children;
  const new_divH = document.createElement("div");
  new_divH.style.gridColumn = head.x;
  new_divH.style.gridRow = head.y;
  new_divH.style.backgroundColor = "rgb(255, 79, 255)"; // head color set
  snake[0].insertAdjacentElement("afterend", new_divH); // HTML render
}

async function startGame() {
  if (direction == "none") return;
  score.style.display = "block";
  Direc.style.display = "block";
  // console.log(" Direction = " + direction);
  snake = Board.children; // accessing the whole block div's
  const n = snake.length;
  if (head.x == fruit.x && head.y == fruit.y) {
    // Remove the Eaten fruit from Html;
    EatAudio.currentTime = 0.5;
    EatAudio.play();
    snake[0].remove();
    score.innerHTML = "Score : " + (n - 1) * 10;
    //*********Animate************
    animateScale(score);
    //*************************** */
    // frut Eaten
    fruit.x = Math.floor(Math.random() * BoardSize) + 1; // column
    fruit.y = Math.floor(Math.random() * BoardSize) + 1; // row
    //Creating  New Fruit :-
    const new_div = document.createElement("div");
    new_div.style.gridColumn = fruit.x;
    new_div.style.gridRow = fruit.y;
    new_div.style.backgroundColor = "rgb(9, 255, 0)"; // Green fruit
    new_div.style.border = "none";
    // console.log("fruit = " + fruit.y + " " + fruit.x);
    Board.prepend(new_div); // HTML render
  } else {
    if (snake[n - 1]) snake[n - 1].remove();
  }

  // console.log(" head = " + head.y + " " + head.x);
  //creating new Head :-
  const new_div = document.createElement("div");
  new_div.style.gridColumn = head.x;
  new_div.style.gridRow = head.y;
  new_div.style.backgroundColor = "rgb(255, 79, 255)"; // head color set
  snake[0].insertAdjacentElement("afterend", new_div); // HTML render
  //Moving Snake :-
  moveSnake(head); // head.x++; //move -> L,R,U,D
  if (snake[2]) snake[2].style.backgroundColor = "rgb(138, 0, 122)"; // body color set.
  // console.log(" head = " + head.y + " " + head.x);
  // console.log(snake);

  if (GameOver()) {
    gameOverAudio.play();
    game_over.style = "display:block;";
    game_over.style.animation = "scaleUpDown 1s ease-in-out infinite"; // Run inifinite animation On
    Direc.style = "display:none;";
    clearInterval(intervalID);
    // console.log("gameOver and head = " + head.y + " " + head.x);
    await delay(1000);
    reset.style = "display:block;";
    animateScale(reset);
  }
}

// run :-
function run() {
  ResetAudio.play();
  SetUp();
  intervalID = setInterval(startGame, 200);
}
run();
