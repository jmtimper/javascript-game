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
};

//render canvas based on vars
var render = function() {
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
}

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

//render computer paddle
Computer.prototype.render = function(){
    this.paddle.render();
}

//creates ball object
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

//renders ball object
Ball.prototype.render = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
}