        var startBtn = document.querySelector('#startBtn');
        var resetBtn = document.querySelector('#resetBtn');
        var pauseBtn = document.querySelector('#pauseBtn');
        var body = document.querySelector('body');
        var scoreBoard = document.querySelector('#score');
        var level =document.querySelector('#level');

        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        pauseBtn.addEventListener('click', pauseGame);
        body.addEventListener('keydown', checkDir);
        //--------------------------button--------------------------------------------------
        function startGame() {
            if (snake.move == false) {
                snakeMoveInterval = setInterval(snakeMove, snake.speed);
                snake.move = true;
            }
        }

        function resetGame() {
            clearTimeout(time);
            snake.move = false;
        }

        function pauseGame() {
            box[appley][applex].className = "yellow";
        }
        var snakeBody = [];
        var snake = {
            dir: 'right',
            speed: 500,
            x: 2,
            y: 0,
            move: false
        }



        var snakeMoveInterval;
        var foodtime = "";
        var size = 10; //table 長and寬
        var level = "1";
        var score = 0; //分數
        var box = [];
        var trs;

        var food = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size),
            color: 'yellow',
            setColor: function (color) {
                box[this.y][this.x].className = color;
                this.color = color;
            },
            light: false
        }

        console.log(food.x);
        console.log(food.y);

        //------------------------------產生移動範圍-----------------------------------------

        window.onload = function () {
            for (var i = 0; i < size; i++) {
                var row = document.createElement("tr");
                trs = new Array();

                for (var j = 0; j < size; j++) {
                    var col = document.createElement("td");

                    trs[j] = col;
                    row.appendChild(col);

                }
                document.getElementById("table").appendChild(row);
                box[i] = trs;
            }

            for (var i = 0; i < 3; i++) {
                snakeBody[i] = box[0][i];
                box[0][i].className = "blue";
            }
        }
        setInterval(foodLight, 500);



        function checkDir(e) {
            if (snake.move == false) {
                return;
            }
            if (e.keyCode === 37 && snake.dir != 'right') {
                snake.dir = 'left'
            } else if (e.keyCode === 38 && snake.dir != 'down') {
                snake.dir = 'up'
            } else if (e.keyCode === 39 && snake.dir != 'left') {
                snake.dir = 'right'
            } else if (e.keyCode === 40 && snake.dir != 'up') {
                snake.dir = 'down'
            } else if (e.keyCode === 13 && snake.move == false) {
                setInterval(snakeMove, snake.speed);
                snake.move = true;
            }
            //clearTimeout(snakeBodyTimeout);

            //snakeBodyMove();
        }

        //main
        function snakeMove() {

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

            //checkBorder();//判斷死亡條件1:觸碰邊界
            //checkTouchBody();//判斷死亡條件2:觸碰本身
            if (snake.x >= size || snake.x < 0 || snake.y >= size || snake.y < 0) {
                alert('gg');
                clearInterval(snakeMoveInterval);
                snake.move = false;
                console.log('s');
                return;
            }

            console.log(snakeBody);
            if (snake.y == food.y && snake.x == food.x) {
                eatFood();
            } else {
                snakeBody[0].className = '';
                snakeBody.shift();
                snakeBody.push(box[snake.y][snake.x]);
                snakeBody[snakeBody.length - 1].className = 'blue';
            }
        }

        //判斷死亡條件1:碰觸邊界
        function checkBorder() {
            if (snake.x >= size || snake.x < 0 || snake.y >= size || snake.y < 0) {
                alert('gg');
                clearInterval(snakeMoveInterval);
                snake.move = false;
                console.log('s');
                return;
            }
        }
        //判斷死亡條件2:觸碰本身
        function checkTouchBody() {
            if (box[snake.y][snake.x].className = 'blue') {
                alert('碰自己');
                clearInterval(snakeMoveInterval);
                return;
            }
            // if(snakeBody.indexOf)
            // if(snake.y=)
        }

        function foodLight() {
            (food.color === 'yellow') ? food.setColor('black'): food.setColor('yellow');
        }

        function eatFood() {
            score += 1;
            scoreBoard.textContent = score;
            snake.speed = snake.speed - (parseInt(score/2)*50);
            setInterval(snakeMove, snake.speed);
            level.textContent=snake.speed;  
            //console.log(updateSpeed);
            food.x = Math.floor(Math.random() * size)
            food.y = Math.floor(Math.random() * size)        
            snakeBody.push(box[snake.y][snake.x]);
            snakeBody[snakeBody.length - 1].className = 'blue';
        }