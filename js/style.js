//constants
let inputDir ={x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let score =0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 7, y: 7}
]
food = {x: 2, y: 1};

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime); 
    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    // if snake collides
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[0].x===snake[i].x&&snake[0].y===snake[i].y){
            return true
        }
    }
    if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0){
            return true
        }
        
    
    return false;
}
function gameEngine(){
    //part 1 : updating the snake array and food 
    if(isCollide(snakeArr)){
        
        gameOver.play();
        musicSound.pause();
        inputDir={x: 0, y: 0};
        alert("gamer over!! press any key to play again!");
        score = 0;
        snakeArr = [{x: 7, y: 7}]
        // musicSound.play()
        
    }
// if you have eaten the food increment the score and regenerate the food 
   if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
       score += 1;
       if(score>highscoreval){
           highscoreval=score;
           localStorage.setItem("hiscore",JSON.stringify(highscoreval))
           hiscoreBox.innerHTML="High Score:"+highscoreval;
       }
       scoreBox.innerHTML= "Score:" +score;
       snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
       let a=2;
       let b=16;
       food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
   }

//moving the snake
for (let i = snakeArr.length-2; i>=0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
    
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;


    // part 2 :  display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
        snakeElement.classList.add('head')
        }else{
        snakeElement.classList.add('snake')

        }
        board.appendChild(snakeElement);
    });

   // display the food
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food')
   board.appendChild(foodElement);

}



//main logic starts here
let hiscore = localStorage.getItem('hiscore');
if(hiscore===null){
    highscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(hiscore);
 hiscoreBox.innerHTML="High Score: "+hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //starts the game
    musicSound.play()
    moveSound.play()

    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow up")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown ")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("Arrow Right")
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;    
        default:
            break;
    }
})