//request animation frame that runs the game at 60fps
var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

//render the 2d canvas
var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

//build objects for game
var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);

//starts the program
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
}

//updates all assets in game
var step = function(){
    update();
    render();
    animate(step);
}

//Todo
var update = function() {
    player.update();
    ball.update(player.paddle, computer.paddle);
};

//render canvas based on vars
var render = function() {
    //fills rectangle with grey
    context.fillStyle = "#D3D3D3";
    context.fillRect(0, 0, width, height);

    //draws solid circle in center and rect around edge
    context.beginPath();
    context.strokeStyle="#FF0000";
    context.setLineDash([]);
    context.arc(300, 200, 100, 0, 2*Math.PI);
    context.strokeRect(0, 0, width, height);
    context.stroke();

    //draws dashed line in middle
    context.beginPath();
    context.setLineDash([5, 10]);
    context.moveTo(width/2, 0);
    context.lineTo(width/2, height);
    context.stroke();

    //renders objects
    player.render();
    computer.render();
    ball.render();
}

//keydown object that keeps track of the keys pressed
var keysDown = {};

//adds key to keydown object
window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

//deletes key from keydown object
window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

//creates paddle object taking in position, width, and height
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

//renders paddle object
Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
}

//creates the player paddle
function Player() {
    this.paddle = new Paddle(580, 170, 10 ,50);
}

//creates the computer paddle
function Computer() {
     this.paddle = new Paddle(10, 170, 10, 50);
}

//render plater paddle
Player.prototype.render = function() {
    this.paddle.render();
}

//updates the paddle based on the keys pressed
Player.prototype.update = function(){
    for(var key in keysDown){
        var value = Number(key);
        if(value == 38){ // up arrow
            this.paddle.move(0, -4);
        } else if(value == 40) { //down arrow
            this.paddle.move(0,4);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

//moves the paddle based on the update function
Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.y < 0){
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > 400) {
        this.y = 400 - this.height;
        this.y_speed = 0;
    }
}

//render computer paddle
Computer.prototype.render = function(){
    this.paddle.render();
}

//creates ball object
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 0;
    this.radius = 5;
}

//renders ball object
Ball.prototype.render = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
}

//updates ball position based on speed
Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;

    //sets bounds for wall
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    //detects if the ball hits the floor or ceiling
    if(this.y - 5 < 0 ) {
        this.y = 5;
        this.y_speed = -this.y_speed;
    } else if (this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = -this.y_speed;
    }

    //detects if the ball has scored
    if(this.x < 0 || this.x > 600){
        this.x_speed = 3;
        this.y_speed = 0;
        this.x = 300;
        this.y = 200;
    }

    //detects if the ball hits a paddle
    if(top_x > 300){
        if(top_y < (paddle1.x + paddle1.width) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            this.x_speed = -3;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    } else {
        if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x){
            this.x_speed = 3;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }
}


