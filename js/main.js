$(document).ready( function () {
  let ctx = canvas.getContext('2d');
  let columns = 80;
  let rows = 60;
  // let w = '600px';
  // let h = '600px';
  let tileWidth;
  let tileHeight;

  // canvas.onresize = calcSize;
  canvas.onmousedown = highlight;

  canvas.width = w = 802;
  canvas.height = h = 602;
  tileWidth = w / columns;
  tileHeight = h / rows;
  ctx.strokeStyle = '#e6e6e6';
  ctx.fillStyle = '#fcc126';
  render();

  // calcSize();
  //
  // function calcSize() {
  //     // canvas.width = w;
  //     // canvas.height = h;
  //
  //
  //
  //
  //     render();
  // }

  function render() {

      // ctx.clearRect(0, 0, w, h);

      ctx.beginPath();

      for(let x = 0; x < columns; x++) {
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
  }

});
