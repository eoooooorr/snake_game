var startBtn = document.querySelector('#startBtn');
var resetBtn = document.querySelector('#resetBtn');
var pauseBtn = document.querySelector('#pauseBtn');
var body = document.querySelector('body');
var scoreBoard = document.querySelector('#score');
var levelBoard = document.querySelector('#level');
var rankBoard = document.querySelector('#rank');

//監聽
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
pauseBtn.addEventListener('click', pauseGame);
body.addEventListener('keydown', checkDir);

//宣告
var snakeBody = [];
var snake = {
    dir: 'right',
    speed: 500,
    x: 2,
    y: 0,
    move: false
}

var snakeMoveTimeout;
var size = 10; //table 長and寬
var level = "1";
var score = 0; //分數
var box = [];
var trs;
var pauseflag = false;
var levelColor = ['#FFDCDC', '#FFC1C1', '#FFAFAF', '#FF9696', '#FF7575', '#FF5454', '#FF2D2D']

var food = {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
    color: 'yellow',
    setColor: function (color) {
        box[this.y][this.x].className = color;
        this.color = color;
    }
}

//建立table
window.onload = function () {
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        trs = [];

        for (var j = 0; j < size; j++) {
            var col = document.createElement("td");

            trs[j] = col;
            row.appendChild(col);

        }
        document.getElementById("table").appendChild(row);
        box[i] = trs;
    }

    snakeInit();
    setInterval(foodLight, 500);
}


function startGame() {
    if (snake.move === false) {
        snake.move = true;
        snakeMove();
    }
}

function resetGame() {
    clearTimeout(snakeMoveTimeout);
    snake.move = false;
    scoreBoard.textContent = 0;
    levelBoard.textContent = 1;
    levelBoard.parentElement.style.color = '#fff';
    snakeInit();
}

function pauseGame() {
    if (pauseflag === false) {
        pauseflag = true;
        clearTimeout(snakeMoveTimeout);
    } else {
        pauseflag = false;
        setTimeout(snakeMove, snake.speed);
    }
    console.log(pauseflag);
}

function snakeInit() {
    for (var i = 0; i < snakeBody.length; i++) {
        snakeBody[i].className = '';
    }

    snakeBody.splice(0, snakeBody.length);

    for (var i = 0; i < 3; i++) {
        snakeBody[i] = box[0][i];
        box[0][i].className = "blue";
    }
    snake.x = 2;
    snake.y = 0;
    snake.dir = 'right';
    snake.speed = 500;
    snake.move = false;
}

function checkDir(e) {
    if (snake.move === false) {
        if (e.keyCode === 13) { //enter
            startGame();
            console.log('start');
        } else if (e.keyCode === 82) { //r
            resetGame();
            console.log('reset');
        }
    } else {
        if (e.keyCode === 37 && snake.dir != 'right') {
            snake.dir = 'left'
        } else if (e.keyCode === 38 && snake.dir != 'down') {
            snake.dir = 'up'
        } else if (e.keyCode === 39 && snake.dir != 'left') {
            snake.dir = 'right'
        } else if (e.keyCode === 40 && snake.dir != 'up') {
            snake.dir = 'down'
        } else if (e.keyCode === 82) { //r
            resetGame();
            console.log('reset');
        } else if (e.keyCode === 80) { //p
            pauseGame();
            console.log('pause');
        }
    }
}

//main
function snakeMove() {
    clearTimeout(snakeMoveTimeout);
    switch (snake.dir) {
        case 'left':
            snake.x -= 1;
            break;
        case 'up':
            snake.y -= 1;
            break;
        case 'right':
            snake.x += 1;
            break;
        case 'down':
            snake.y += 1;
            break;
    }
    //先移動再判斷下一步是否犯規

    checkBorder(); //判斷死亡條件1:觸碰邊界
    checkTouchBody(); //判斷死亡條件2:觸碰本身

    if (snake.move == true) {
        if (snake.y == food.y && snake.x == food.x) {
            eatFood();
            snakeBody.push(box[snake.y][snake.x]);
            snakeBody[snakeBody.length - 1].className = 'blue';

        } else {
            snakeBody[0].className = '';
            snakeBody.shift();
            snakeBody.push(box[snake.y][snake.x]);
            snakeBody[snakeBody.length - 1].className = 'blue';
        }
        snakeMoveTimeout = setTimeout(snakeMove, snake.speed);

    }
}

//判斷死亡條件1:碰觸邊界
function checkBorder() {
    if (snake.x >= size || snake.x < 0 || snake.y >= size || snake.y < 0) {
        alert('碰觸邊界');
        snake.move = false;
        saveRank();
    }
}

//判斷死亡條件2:觸碰本身
function checkTouchBody() {
    if (snake.move == true) {
        for (var i = 0; i < snakeBody.length; i++) {
            if (snakeBody[i] == box[snake.y][snake.x]) {
                alert('碰自己');
                snake.move = false;
            }
        }
    }
}

function saveRank() {
    var rank = [];
    var time = new Date();
    rank.push(score);
    var td = document.createElement('td');
    var td2 = document.createElement('td');
    td.innerText = score;
    td2.innerText = time.getHours() + ':' + time.getMinutes();

    var tr = document.createElement('tr');

    tr.appendChild(td2);
    tr.appendChild(td);
    rankBoard.appendChild(tr);

    localStorage.setItem('rankData', rank);
}

function foodLight() {
    (food.color === 'yellow') ? food.setColor('black'): food.setColor('yellow');
}

function eatFood() {
  updateScore();
  updateSpeed();
  food.x = Math.floor(Math.random() * size)
  food.y = Math.floor(Math.random() * size)
}

function updateSpeed() {
    if (snake.speed > 100) {
        snake.speed -= 20;
    }
}

function updateScore() {
    score += 1;
    var levelText = parseInt(score / 3);
    scoreBoard.textContent = score;
    if (levelText <= 7) {
        levelBoard.textContent = levelText + 1;
        levelBoard.parentElement.style.color = levelColor[levelText];
    } else {
        levelBoard.textContent = 'Max';
    }

}