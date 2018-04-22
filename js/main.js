$(document).ready( function () {
  let canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // drawing code here
    let columns = 80;
    let rows = 60;
    let w = canvas.width = 800;
    let h = canvas.height = 600;
    let tileWidth = w / columns;
    let tileHeight = h / rows;

    // color of the lines making up the grid
    ctx.strokeStyle = '#e3e3e3';
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
        // sendCoordDeets();
        return;
      } else {
        filledSquares.push(fillDeets);
        console.log(filledSquares);
        ctx.fillRect(xIndex * tileWidth, yIndex * tileHeight, tileWidth, tileHeight);
        sendCoordDeets(fillDeets);
      }
    }
    const sendCoordDeets = function(deets) {
      console.log(deets);
      console.log(deets.x);
      $.ajax('https://cocanvas-server.herokuapp.com/coordinates', {
      method: 'post',
      dataType: 'json', // data type you want back
      data: {coordinate: {x: deets.x, y: deets.y, colour: deets.colour, user_id: 1}} // what you're sending - needs to be a json object? needs a madeup key for each value
      })
        // .done(function(response) {
        // console.log(`response back from postInfo ajax request was: ${response}`);
        // }).fail(function() {
        // alert('something bad happened, sorry.')
        // });
      // }
    }


  } else {
    // canvas-unsupported code here
  }


  $(".colorPickSelector").colorPick();

  $(".colorPickSelector").colorPick({
    'initialColor': '#f1c40f',
    'allowRecent': true,
    'recentMax': 10,
    'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#63DDDD", "#3498db", "#2980b9", "#295B88", "#9b59b6", "#8e44ad", "#A5567C", "#602650", "#7B1A34","#8A2755", "#CC647B",  "#FF747C", "#002642", "#34495e", "#2c3e50", "#000000", "#FFF07C", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#f70", "#e74c3c", "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d"],
    'onColorSelected': function() {
      this.element.css({'backgroundColor': this.color, 'color': this.color});
      ctx.fillStyle = this.color;
      currentFillColour = this.color;
    }
  });








});
