# snake_game 
![image](https://github.com/npcenthusiasm/snake_game/blob/master/snake1.png)
![image](https://github.com/npcenthusiasm/snake_game/blob/master/snake2.png)

https://npcenthusiasm.github.io/snake_game/

這是一個簡單的貪吃蛇遊戲

### 目的
- 練習HTML、CSS
- 使用JavaScript操作DOM
### 內容
- 鍵盤控制
  - 上`↑`下`↓`左`←`右`→`
  - 開始`Enter` 重置`R` 暫停`P`
- 吃到食物，蛇身變長、分數+1、速度變快
- 死亡判斷
  - 吃自己
  - 撞牆
- 紀錄分數

#### 隨機生成食物的方法

    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
#### 移動辦法、食物閃爍
- setTimeout
- setInterval

使用setTimeout(function(),500)來達到移動
Gameover時 使用clearTimeout清除計數
#### 陣列記錄蛇的長度與位置
我的概念是：
1. 清除蛇尾color
2. 移除尾端位置
3. 更新蛇頭位置
4. 添加蛇頭color  

換作程式碼的話

    snakeBody[0].className = '';
    snakeBody.shift()
    snakeBody.push()
    snakeBody[snakeBody.length - 1].className = 'blue';
    
