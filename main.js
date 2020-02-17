// function init(){
//     var ball = document.getElementById('ball');
//     var top = ball.getBoundingClientRect().top;
//     // ball.style.top = '200px';
//     console.log(top)
// // };
// for(let i=0;i<100;i++){
//     setTimeout(function(){
//         // console.log(0.5*i*i*9.8);
//         ball.style.top = (0.5*i*i*1.8*0.1) + 'px';
//         console.log(ball.style.top)
//     },1*i)
// }

// function getStyle(oElm, strCssRule){
// 	var strValue = "";
// 	if(document.defaultView && document.defaultView.getComputedStyle){
// 		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
// 	}
// 	else if(oElm.currentStyle){
// 		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
// 			return p1.toUpperCase();
// 		});
// 		strValue = oElm.currentStyle[strCssRule];
// 	}
// 	return strValue;
// }

// var plate = document.querySelector('.plate');
// var left =parseInt(getStyle(plate,'left').slice(0,-2));

// function movePlate(e){
//     console.log(e);

//     // console.log(i)
//     // return function(e){
//         if(e.keyCode == 37){
//             left -=20;
//             plate.style.left = left +'px';
//             console.log( left);
//         }else if(e.keyCode == 39){
//             left +=20;
//             plate.style.left = left +'px';
//             // plate.style.left = plate.style.left + 1 +'px';
//             console.log( plate.style.left);
    
//         }
//     // }
// }

// // document.addEventListener('keydown',movePlate);

// var tickRate = 5,
//     keyDown = {},
//     keyMap = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     document.addEventListener('keyup',function(e){ 
//         console.log(e)
//           keyDown[keyMap[e.which]] = false;
//         } )
//     document.addEventListener('keydown',function(e){   
//         keyDown[keyMap[e.which]] = true; 
//     })

// function moveLeft(){
//     left-5<0? 0:left -=5;
//     if(left<650 && left>=0)
//     plate.style.left = left +'px';
// }
// function moveRight(){
//     left+5>800?left=650:left+=5;
//     if(left<=650 && left>0)
//     plate.style.left = left +'px';
// }

// var tick = function() {
//   if        (keyDown['up']) {
//     // up code
//     console.log('up')

//   } else if (keyDown['down']) {
//     // movePlate();
//     console.log('down')
//   } else if (keyDown['left']) {
//     // left code
//     moveLeft()
//   } else if (keyDown['right']) {
//     // right code
//     moveRight()

//   }

//   // other code

//   setTimeout(tick, tickRate);
// };

// tick();

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;
var keys = [];


var collisionBoxes = [];
var x =400,y = 480;
var plateX = 325,plateY = 490;
var flagX =5, flagY =5;
function move(){
  requestAnimationFrame(move);

  if(pause || keys[32]){
    return
  }
  ctx.clearRect(0, 0, 800, 500);
  if(keys[37] ){
    plateX-=10;
    // plateY--;
    // console.log(x,y)
  }
  x = x+flagX;
  y = y+flagY;
  if(x ==790 || x==10  ){
    flagX = -flagX;
  }

  if(y ==490 || y==10 || (y==20)){
    flagY = -flagY;
    
  }

  if(keys[39] && plateX<650){
    plateX+=10
  }
  if(plateX>650){
    plateX =650;
  }else if(plateX<0){
    plateX =0;
  }

  if(y==490 && (x<plateX || x>plateX+150)){
    console.log('miss')
  }

  if(y==480 && (x>plateX && x<plateX+150)){
    flagY = -5;
    console.log('hit')
  }
  // ctx.fillRect(325,490,150,10);
  ctx.fillStyle = '#6f4e37';
  ctx.fillRect(plateX,plateY,150,10);

  ctx.fillStyle = 'lightBlue';
  // ctx.fillRect(20,20,100,20);
  getBoxXPos(x,800,y,250)
  createBlock(800, 250, collisionBoxes);

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';

  ctx.fill();

}

function createBlock(maxX,maxY,noRenderXY){
  for(var i=1;120*i<=maxX-20 ;i++){
    for(var j=1; 40*j<= maxY-20;j++){
      ctx.fillRect((i-1)*120+50,(j-1)*50+30,80,20);

      // console.log(i,j)
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
        if((y ==j*50-30 || y==j*50+10) && x<= (i-1)*120+130 && x>=(i-1)*120+50){

       
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
  //  if(x<= (i-1)*120+130 && x>=(i-1)*120+50){
  //    console.log(i );
  //    break; 
  //  }
  // }
  }
  collisionBoxes = collisionBoxes.filter((x, i, a) => a.indexOf(x) == i)
//   collisionBoxes = collisionBoxes.filter(function(item, pos) {
//     return collisionBoxes.indexOf(item) == pos;
// })
// console.log(...new Set(collisionBoxes));

  
}

var pause = false;

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