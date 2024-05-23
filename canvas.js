const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 25;
canvas.width = canvas.height * 2;
var x = Math.round(canvas.width / 2);
var y = Math.round(canvas.height / 2);
var check = 0;
var speedX = 0;
var speedY = 0;
var oldx = x;
var oldy = y;
var xt = [];
var yt = [];
var p = 0;
var fatcount = 1;
alert("PRESS P TO PAUSE/UNPAUSE!");

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
    for(let i = 0 - y; i < y + y; i++) {
        array[i] = [];
        for(let j = 0 - x; j < x + x; j++) {
            array[i][j] = null;
        }
    }
    return array;
}
var map = array2D(canvas.height,canvas.width);

window.addEventListener('resize', () => {
    display();
})

var s = 0;
var keys = [];
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
    if(s == 0) {
        if(p == 0) {
        if((keys[68] || keys[39]) && s == 0) {//d and right arrow
            if(speedX == 0) speedX = 1;
            speedY = 0;
            keys[68] = 0;
            keys[39] = 0;
            s = 1;
        }
        if((keys[65] || keys[37]) && s == 0) {//a and left arrow
            if(speedX == 0) speedX = -1;
            speedY = 0;
            keys[65] = 0;
            keys[37] = 0;
            s = 1;
        }
        if((keys[87] || keys[38]) && s == 0) {//w and up arrrow
                if(speedY == 0) speedY = -1
                speedX = 0;
                keys[87] = 0;
                keys[38] = 0;
                s = 1;
        }
        if((keys[40] || keys[83]) && s == 0) { //s and down arrow
            if(speedY == 0) speedY = 1;
            speedX = 0;
            keys[40] = 0;
            keys[83] = 0;
            s = 1;
        }
    }
        if(keys[80]) {
            if(p == 1) {
                p = 0;
            } else if(p == 0) {
                p = 1;
            }
            keys[80] = 0;
        }
    }
    }

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
    if(p != 1) {
    check = 0;
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
    if(map[y][x] == 3) {
        lose();
    }
    if(x < 0) {
        x = canvas.width;
    } else if(x >= canvas.width) {
        x = 0;
    }
    if(y < 0) {
        y = canvas.height;
    } else if(y >= canvas.height) {
        y = 0;
    }
    map[oldy][oldx] = 3;
    map[y][x] = 1;
    map[fruitY][fruitX] = 2;
    map[yt[fatcount]][xt[fatcount]] = null;
    check = 1;
    display();
    setTimeout(() => {
        s = 0;
        requestAnimationFrame(game);
    },1000/15)
} else if(p == 1) {
    requestAnimationFrame(game);
}
}
game();
