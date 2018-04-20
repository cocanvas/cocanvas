// $(document).ready( function () {
// let colorPurple = "#cb3594";
// let colorGreen = "#659b41";
// let colorYellow = "#ffcf33";
// let colorBrown = "#986928";
//
// let curColor = colorPurple;
// let clickColor = new Array();
//
//
// let canvasDiv = document.getElementById('canvasDiv');
// canvas = document.createElement('canvas');
//
// let pixel = {
// color: 'rgba(0, 0, 0, 1)',
// // width: '10px',
// // height: '10px'
// };
//
// canvas.setAttribute('width', '800px');
// canvas.setAttribute('height', '600px');
// let columns = 80;
// let rows = 60;
// let tileWidth  = canvas.width / columns;
// let tileHeight = canvas.height / rows;
//
// let x = xIndex * tileWidth;
// let y = yIndex * tileHeight;
//
//
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
// if(typeof G_vmlCanvasManager != 'undefined') {
// canvas = G_vmlCanvasManager.initElement(canvas);
// }
// context = canvas.getContext("2d");
//
// $('#canvas').mousedown(function(e){
// let mouseX = e.pageX - this.offsetLeft;
// let mouseY = e.pageY - this.offsetTop;
//
// paint = true;
// addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
// redraw();
// });
//
// $('#canvas').mousemove(function(e){
// if(paint){
// addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
// redraw();
// }
// });
//
// $('#canvas').mouseup(function(e){
// paint = false;
// });
//
// $('#canvas').mouseleave(function(e){
// paint = false;
// });
// // Not entirely sure how this works, but will need to store coordinates inside these arrays and then in DB
// let clickX = new Array(); // Constantly
// let clickY = new Array();
// let clickDrag = new Array();
// let paint;
//
// function addClick(x, y, dragging) {
// clickX.push(x);
// clickY.push(y);
// clickDrag.push(dragging);
// clickColor.push(curColor);
// }
//
//
// function redraw(){
// context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
//
// context.lineJoin = "round";
// context.lineWidth = 10;
//
// for(var i=0; i < clickX.length; i++) {
// context.beginPath();
// if(clickDrag[i] && i){
// context.moveTo(clickX[i-1], clickY[i-1]);
// }else{
// context.moveTo(clickX[i]-1, clickY[i]);
// }
// context.lineTo(clickX[i], clickY[i]);
// context.closePath();
// context.strokeStyle = clickColor[i];
// context.stroke();
// }
// }
//
// });
