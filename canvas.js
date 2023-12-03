const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 25;
canvas.width = 50;
var x = Math.round(canvas.width / 2);
var y = Math.round(canvas.height / 2);
var speedX = 0;
var speedY = 0;
var oldx = x;
var oldy = y;
var xt = [];
var yt = [];
var fatcount = 1;

for(let i = 0; i < canvas.height * canvas.width; i++) {
    xt[i] = 0;
    yt[i] = 0;
}

function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var fruitX = RB(0,canvas.width);
var fruitY = RB(0,canvas.height);

var array2D = (y,x) => {
    var array = [];
    for(let i = 0; i < y; i++) {
        array[i] = [];
        for(let j = 0; j < x; j++) {
            array[i][j] = null;
        }
    }
    return array;
}
var map = array2D(canvas.height,canvas.width);

window.addEventListener('resize', () => {
    display();
})
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
    return;
    }
    switch (event.key) {
    case "ArrowDown":
        if(speedY == 0) speedY = 1;
       speedX = 0;
      break;
    case "ArrowUp":
        if(speedY == 0) speedY = -1;
        speedX = 0;
      break;
    case "ArrowLeft":
        if(speedX == 0) speedX = -1;
        speedY = 0;
      break;
    case "ArrowRight":
       if(speedX == 0) speedX = 1;
       speedY = 0;
      break;
    case "e":
        alert(xt);
        alert(yt);
        break;
    default:
      return;
    }
    event.preventDefault();
    }, true);
var display = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            if(map[i][j] == 1) {
                ctx.fillStyle = "red";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 2) {
                ctx.fillStyle = "green";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 3) {
                ctx.fillStyle = "brown";
                ctx.fillRect(j,i,1,1);
            }
        }
    }
}

var lose = () => {
    alert("YOU LOSE!");
    x = Math.round(canvas.width / 2);
    y = Math.round(canvas.height / 2);
    speedX = 0;
    speedY = 0;
    fatcount = 1;
    for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            map[i][j] = null;
        }
    }
}

//game
var game = () => {
    oldx = x;
    oldy = y;
    for(let i = fatcount + 1; i > -1; i--) {
        xt[i + 1] = xt[i];
        xt[0] = x;
        yt[i + 1] = yt[i];
        yt[0] = y;
    }
    if(x == fruitX && y == fruitY) {
        fatcount++;
        map[fruitY][fruitX] == null;
        fruitX = RB(2,canvas.width - 2);
        fruitY = RB(2,canvas.height - 2)
    }
    x += speedX;
    y += speedY;
    if(map[y][x] == 3 || x <= 0 || y <= 0 || x >= canvas.width - 1 || y >= canvas.height - 1) {
        lose();
    }
    map[oldy][oldx] = 3;
    map[y][x] = 1;
    map[fruitY][fruitX] = 2;
    map[yt[fatcount]][xt[fatcount]] = null;
    display();
    setTimeout(() => {
        requestAnimationFrame(game);
        document.title = x + "  " + y;
    },1000/15)
}
game();