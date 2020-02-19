
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;
var keys = [];
var score = 0;

var collisionBoxes = [];
var x =400,y = 480;
var plateX = 350,plateY = 490;
var flagX =5, flagY =5;
var pause = false;

function move(){
  requestAnimationFrame(move);

  if(pause || keys[32]){
    ctx.fillStyle = 'rgba(255, 255, 255,0.1)';
    ctx.fillRect(0,0,800,500);
    ctx.font = '25px serif';
    if(score<30){
      // ctx.clearRect(0, 0, 800, 500);

      ctx.fillStyle = '#000000';
      ctx.fillText('Press space to resume', 320, 220);
    }
    else{
      // success();
      ctx.fillStyle = 'green';
      ctx.fillText('Congratulations! You have won!', 270, 220);
    }
    return
  }
  ctx.clearRect(0, 0, 800, 500);
  if(keys[37] ){
    plateX-=10;
  }
  x = x+flagX;
  y = y+flagY;
  if(x ==790 || x==10  ){
    flagX = -flagX;
  }

  if(y ==490 || y==10 ){
    flagY = -flagY;
    
  }

  if(keys[39] && plateX<700){
    plateX+=10
  }
  if(plateX>700){
    plateX =700;
  }else if(plateX<0){
    plateX =0;
  }

  if(y==490 && (x<plateX || x>plateX+100)){
    // console.log('miss')
    collisionBoxes = [];
    score = 0
  }

  if(y==480 && (x>plateX && x<plateX+100)){
    flagY = -5;
    // console.log('hit')
  }
  // ctx.fillRect(325,490,150,10);
  ctx.fillStyle = '#6f4e37';
  ctx.fillRect(plateX,plateY,100,10);

  ctx.fillStyle = 'lightBlue';
  // ctx.fillRect(20,20,100,20);
  getBoxXPos(x,800,y,250)
  createBlock(800, 250, collisionBoxes);

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();

  ctx.font = '25px serif';
  ctx.fillStyle = 'blue';
  ctx.fillText(score, 765, 25);
  ctx.fillStyle = '#000000';
  ctx.font = '28px serif';
  ctx.fillText('score:', 690, 24);

}

function createBlock(maxX,maxY,noRenderXY){
  for(var i=1;120*i<=maxX-20 ;i++){
    for(var j=1; 40*j<= maxY-20;j++){
      ctx.fillRect((i-1)*120+50,(j-1)*50+30,80,20);
    }
  }
  for(var k = 0;k<noRenderXY.length;k++){
    ctx.clearRect((noRenderXY[k][0]-1)*120+50,(noRenderXY[k][1]-1)*50+30,80,20);
  }
}

move();

function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
      // This if statement depends on the format of your array
      if (array[i][0] == item[0] && array[i][1] == item[1]) {
          return true;   // Found it
      }
  }
  return false;   // Not found
}

function getBoxXPos(x,maxX,y,maxY){
  for(var i=1;120*i<maxX-20;i++){
    for(var j=1;40*j<= maxY-20;j++){
      if(!isItemInArray(collisionBoxes,[i,j])){
        if((y ==j*50-30 || y==j*50+10) && x<= (i-1)*120+130+10 && x>=(i-1)*120+50-10){
          score++;
          if(score == 30){
            pause = true;
          }
          // console.log(score)
          if(y ==j*50-30){
            flagY = -5
          }
          if(y==j*50+10){
            flagY = 5
          }
          
          collisionBoxes.push([i,j])
          break;
        }
      }
    }

  }
  collisionBoxes = collisionBoxes.filter((x, i, a) => a.indexOf(x) == i)
 
}


document.body.addEventListener("keydown", function (e) {
  if(e.keyCode == 32)
  {
    pause =!pause;
  }
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});