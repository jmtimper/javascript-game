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
}