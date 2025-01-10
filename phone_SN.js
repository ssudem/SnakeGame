class cordi {
  constructor(y, x) {
    this.x = x; // column
    this.y = y; // row
  }
}
document.querySelector(".direction").style.display = "none";
//import Audios:-
const gameOverAudio = new Audio("./gameOver.mp3");
const clickAudio = new Audio("./click.mp3");
const EatAudio = new Audio("./eat.mp3");
const ResetAudio = new Audio("./reset.mp3");
clickAudio.volume = 0.5;
ResetAudio.volume = 0.2;

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
  Button.removeEventListener("click", OnPress);
  // console.log("Event Listner Removed .");
  // Re-add the event listener after the timeout
  setTimeout(() => {
    Button.addEventListener("click", OnPress);
    // console.log("Event Listner Added Back .");
  }, timeout);
}
function OnPress(event) {
  if (event.target.tagName !== "I") return;

  // console.log(event.target.id);
  switch (event.target.id) {
    case "up":
      if (direction != "down") {
        direction = "up";
        clickAudio.play();
        //console.log(event.target.Id);
        Direc.innerHTML = event.target.id.toUpperCase()[0];
        tempStopListner(300);
      }
      // tempStopListner(150);
      break;
    case "down":
      if (direction != "up") {
        direction = "down";
        clickAudio.play();
        //console.log(event.target.Id);
        Direc.innerHTML = event.target.id.toUpperCase()[0];
        tempStopListner(300);
      }
      //tempStopListner(150);
      break;
    case "left":
      if (direction != "right") {
        direction = "left";
        //console.log(event.target.Id);
        clickAudio.play();
        Direc.innerHTML = event.target.id.toUpperCase()[0];
        tempStopListner(300);
      }
      //   tempStopListner(150);
      break;
    case "right":
      if (direction != "left") {
        direction = "right";
        clickAudio.play();
        //console.log(event.target.Id);
        Direc.innerHTML = event.target.id.toUpperCase()[0];
        tempStopListner(300);
      }
      //  tempStopListner(150);
      break;
    default:
    // direction = "none";
  }

  // console.log(event.target.id);
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
      head.y = BHeight / 2;
      head.x = Bwidth / 2;
      break;
    default:
  }
}
function GameOver() {
  if (direction === "none") return false;
  snake = Board.children;
  const n = snake.length;
  if (head.x > Bwidth || head.x < 1 || head.y > BHeight || head.y < 1)
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
// const BoardSize = 20;
const BHeight = 30;
const Bwidth = 20;
const Board = document.querySelector("#Board");
// ********************************************************************************
const temp = Board.getBoundingClientRect();
const columns = Bwidth;
const rows = BHeight;
const BoxSize = temp.width / columns;
Board.style.height = `${rows * BoxSize}px`;
Board.style.width = `${columns * BoxSize}px`;
Board.style.gridTemplateRows = `repeat(${rows}, ${BoxSize}px)`;
Board.style.gridTemplateColumns = `repeat(${columns}, ${BoxSize}px)`;
//*********************************************************************************
const reset = document.querySelector(".reset");
const game_over = document.querySelector(".gameover");
const Direc = document.querySelector(".direc");
const Button = document.getElementById("Button");
const score = document.getElementById("score");
const head = new cordi(BHeight / 2, Bwidth / 2); //  head .
const fruit = new cordi(
  Math.floor(Math.random() * BHeight) + 1,
  Math.floor(Math.random() * Bwidth) + 1
);
// Listner's :-
// document.addEventListener("keydown", OnPress);
reset.addEventListener("click", run);
Button.addEventListener("click", OnPress);

function SetUp() {
  game_over.style.animation = ""; // Run inifinite off
  document.getElementById("Display").style.flexDirection = "row";
  reset.style = "display:none;";
  game_over.style = "display:none;";
  direction = "none";
  score.style.display = "block";
  Direc.style.display = "none";
  Button.style.display = "grid";
  Direc.innerHTML = "";
  score.innerHTML = "Score : 0";
  head.x = Math.floor(Bwidth / 2);
  head.y = Math.floor(BHeight / 2);
  fruit.x = Math.floor(Math.random() * Bwidth) + 1;
  fruit.y = Math.floor(Math.random() * BHeight) + 1;
  //clear Board :-
  while (Board.firstChild) {
    Board.removeChild(Board.firstChild);
  }
  //Creating New Initial Fruit :-
  const new_divF = document.createElement("div");
  new_divF.style.gridColumn = fruit.x;
  new_divF.style.gridRow = fruit.y;
  new_divF.style.backgroundColor = "rgb(9, 255, 0)"; // Orange fruit
  new_divF.style.border = "none";
  Board.prepend(new_divF); // HTML render
  // Creating Initial Head :-
  snake = Board.children;
  const new_divH = document.createElement("div");
  new_divH.style.gridColumn = head.x;
  new_divH.style.gridRow = head.y;
  new_divH.style.backgroundColor = "#ff00ff"; // head color set
  snake[0].insertAdjacentElement("afterend", new_divH); // HTML render
}

async function startGame() {
  if (direction == "none") return;
  // Button.style.display = "block";
  score.style.display = "block";
  Direc.style.display = "block";
  snake = Board.children; // accessing the whole  div's child block of Board .
  const n = snake.length;
  if (head.x == fruit.x && head.y == fruit.y) {
    EatAudio.currentTime = 0.5;
    EatAudio.play();
    //*********Animate************
    animateScale(score);
    //*************************** */
    // Removre the Eaten fruit from Html:-
    snake[0].remove();
    score.innerHTML = "Score : " + (n - 1); // update score .
    // update fruit Cordinate :-
    fruit.x = Math.floor(Math.random() * Bwidth) + 1;
    fruit.y = Math.floor(Math.random() * BHeight) + 1;
    //Creating  New Fruit :-
    const new_div = document.createElement("div");
    new_div.style.gridColumn = fruit.x;
    new_div.style.gridRow = fruit.y;
    new_div.style.backgroundColor = "rgb(9, 255, 0)"; // Orange fruit
    new_div.style.border = "none";
    Board.prepend(new_div); // HTML render
  } else {
    if (snake[n - 1]) snake[n - 1].remove();
  }
  //creating new Head :-
  const new_div = document.createElement("div");
  new_div.style.gridColumn = head.x;
  new_div.style.gridRow = head.y;
  new_div.style.backgroundColor = "#ff00ff"; // head color set
  snake[0].insertAdjacentElement("afterend", new_div); // HTML render
  //Moving Snake :-
  moveSnake(head); // head.x++; //move -> L,R,U,D
  if (snake[2]) snake[2].style.backgroundColor = "rgb(138, 0, 122)"; // body color set.

  if (GameOver()) {
    gameOverAudio.play();

    // gameOver
    clearInterval(intervalID);
    game_over.style = "display:block;";
    game_over.style.animation = "scaleUpDown 1s ease-in-out infinite"; // Run inifinite animation On
    Direc.style = "display:none;";
    Button.style.display = "none";
    document.getElementById("Display").style.flexDirection = "column";

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
