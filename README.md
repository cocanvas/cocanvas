# CoCanvas App

[CoCanvas](https://co-canvas.herokuapp.com/#0) is a cooperative, pixel art drawing game by [Katrina Hayes](https://github.com/katshaze), [Mandy Tang](https://twitter.com/amandytang), [Rob Harkness](https://github.com/robo2323) and [Vu Le](https://github.com/vl9). Register an account to make 8-bit art with your friends, or take over their pixels (we won't judge). If you make something awesome, let us know! 🖼

![CoCanvas Screenshot](https://github.com/amandytang/cocanvas-server/blob/master/app/assets/images/screenshot.png)
<br/>

## Features
* Live multiplayer drawing on canvas via WebSockets and Action Cable 🎨
* Live chat implemented in React also using WebSockets and Action Cable
* User registration using JSON web tokens
* Colourpicker with most recent colours saved

## Possible Improvements
* Private group canvases
* Time-lapse gif of canvas
* Adding emoji picker to the chat
* Chunk coordinates JSON data when fetching via ajax

## Technologies Used
### [Server](https://github.com/cocanvas/cocanvas-server)
* Ruby on Rails
* PostgreSQL
* bcrypt
* Redis for deployment to Heroku
* Action Cable

### [Front End](https://github.com/cocanvas/cocanvas)
The front end is a basic Nodejs app using expressJS to create a server that is deployed to Heroku. Project uses Webpack for the build.
The following libraries/api's/frameworks are used:
* Canvas 🖌
* jQuery
* colourpick (jQuery plugin)
* React
* Animate.css
* Nodejs
* expressJS
* webpack
* babel

## Acknowledgements
A big thanks to Joel, John and Theo at GA.

## License
Licensed under MIT.
