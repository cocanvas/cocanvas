const SERVER_URL = 'https://localhost:3000/coordinates';

$(document).ready( function () {

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    // drawing code here
    let columns = 80;
    let rows = 60;
    let w = canvas.width = 800;
    let h = canvas.height = 600;
    let tileWidth = w / columns;
    let tileHeight = h / rows;

    // color of the lines making up the grid
    ctx.strokeStyle = '#dadada';
    // color when the small squares are filled (this will need to be changeable later)
    ctx.fillStyle = '#f70';
    currentFillColour = '#f70';

    let filledSquares = [];

    render();

    // render function creates 80 vertical lines and 60 horizontal lines to create grid
    function render(clicked=false) {

        // below: if statement for distinguishing btw hover and click (bonus for later)
        // if (clicked) {
        //
        // } else {
        //   ctx.clearRect(0, 0, w, h);
        // }

        ctx.beginPath();

        for(let x = 0; x < columns; x++) {
            ctx.moveTo(x * tileWidth, 0);
            ctx.lineTo(x * tileWidth, h);
        }
        for(let y = 0; y < rows; y++) {
            ctx.moveTo(0, y * tileHeight);
            ctx.lineTo(w, y * tileHeight);
        }
        ctx.stroke();
    }

    // below: bonus feature for showing colour on hover
    // let currentParams = [];
    // canvas.onmousemove = highlight;
    // function highlight(e) {
    //
    //   if (filledSquares.length > 0) {
    //     for (let i = 0; i < filledSquares.length; i++) {
    //       if (filledSquares[i] === currentParams) {
    //         return;
    //       } else {
    //         ctx.clearRect(currentParams[0], currentParams[1], currentParams[2], currentParams[3]);
    //       }
    //     }
    //   } else {
    //     ctx.clearRect(currentCoords.xCoord, currentCoords.yCoord, tileWidth, tileHeight);
    //   }
    //
    //   render();
    //
    //   var rect = canvas.getBoundingClientRect(),
    //       mx = e.clientX - rect.left,
    //       my = e.clientY - rect.top,
    //
    //       /// get index from mouse position
    //       xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth),
    //       yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);
    //
    //   currentCoords = {
          // xCoord: xIndex * tileWidth,
          // yCoord: yIndex * tileHeight
        // }
    //   console.log(currentParams);
    //   ctx.fillRect(xIndex * tileWidth, yIndex * tileHeight, tileWidth, tileHeight);
    //
    // }

    canvas.onmousedown = fill;
    function fill(e) {
      let rect = canvas.getBoundingClientRect();
      let mx = e.clientX - rect.left;
      let my = e.clientY - rect.top;

      /// get index from mouse position
      xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth);
      yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);

      // render(); // not sure this render is needed
      fillDeets = {
        x: xIndex * tileWidth,
        y: yIndex * tileHeight,
        colour: currentFillColour
      }

      if (filledSquares.length >= 10) {
        sendCoordDeets();
        return;
      } else {
        filledSquares.push(fillDeets);
        console.log(filledSquares);
        ctx.fillRect(xIndex * tileWidth, yIndex * tileHeight, tileWidth, tileHeight);
      }
    }
    const sendCoordDeets = function() {
      for (let i = 0; i < filledSquares.length; i++) {
        $.ajax('/coordinates', {
        method: 'post',
        dataType: 'json', // data type you want back
        data: // what you're sending - needs to be a json object? needs a madeup key for each value
        {colour: filledSquares[i].colour, x: filledSquares[i].x, y: filledSquares[i].y}
        }).done(function(response) {
        console.log(`response back from postInfo ajax request was: ${response}`);
        }).fail(function() {
        alert('something bad happened, sorry.')
        });
      }

    }


  } else {
    // canvas-unsupported code here
  }
});
