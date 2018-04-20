let context = canvas.getContext('2d'),
let columns = 80;
let rows = 60;
let w
h, tileWidth, tileHeight;

canvas.onresize = calcSize;
canvas.onmousemove = highlight;

calcSize();

function calcSize() {
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;

    tileWidth = w / columns;
    tileHeight = h / rows;

    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#f70';

    render();
}
function render() {

    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    for(var x = 0; x < columns; x++) {
        ctx.moveTo(x * tileWidth, 0);
        ctx.lineTo(x * tileWidth, h);
    }
    for(var y = 0; y < rows; y++) {
        ctx.moveTo(0, y * tileHeight);
        ctx.lineTo(w, y * tileHeight);
    }
    ctx.stroke();
}
function highlight(e) {

    var rect = canvas.getBoundingClientRect(),
        mx = e.clientX - rect.left,
        my = e.clientY - rect.top,

        /// get index from mouse position
        xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth),
        yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);

    render();

    ctx.fillRect(xIndex * tileWidth,
                 yIndex * tileHeight,
                 tileWidth,
                 tileHeight);
