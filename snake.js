let canvas = document.getElementById("canvas")
let ROWS = 30
let COLS = 50
let PIXEL = 10
let pixels = new Map() 
let gameInterval = null
let moveLeft = ([t, l]) => [t, l-1]
let moveRight = ([t, l]) => [t, l+1]
let moveDown = ([t, l]) => [t+1, l]
let moveUp = ([t, l]) => [t-1, l]

function initialCanvas() {
  for(let i = 0; i< ROWS; i++) {
    for(let j = 0; j< COLS; j++) {
      let pixel = document.createElement("div") 
      pixel.style.border = "1px solid red"
      pixel.style.position = "absolute"
      pixel.style.width = PIXEL + "px"
      pixel.style.height = PIXEL + "px"
      pixel.style.top = i * PIXEL + "px"
      pixel.style.left = j * PIXEL + "px"
      canvas.appendChild(pixel)
      let key = toKey([i, j])
      pixels.set(key, pixel)
    }
  } 
}


let currentSnake = [
  [0,0],
  [0,1],
  [0,2]
]

function drawSnake() {
  let snakePos = new Set()
  for([x,y] of currentSnake) {
    snakePos.add(x + '_' + y)
  }
  console.log(snakePos)
  for(var i = 0; i< ROWS; i++) {
    for(var j = 0; j< COLS; j++) {
      let key = toKey([i,j])
      let pixel = pixels.get(key)
      background = "white"
      if(snakePos.has(key)) {
        background = "black"
      }
      pixel.style.background = background
    }
  }
}

let currentDirection;
currentDirection = moveLeft
function step() {
  drawSnake()
  let head = currentSnake[currentSnake.length-1]
  let nextHead = [head[0], head[1]+1]
  currentSnake.shift()
  currentSnake.push(nextHead)
  console.log(currentDirection)
}
window.addEventListener("keydown", (e) => {
  e.preventDefault()
  console.log(e.key)
  switch (e.key) {
    case "ArrowRight":
      currentDirection = moveRight
      break;
   case "ArrowLeft":
      currentDirection = moveLeft
      break;
   case "ArrowUp":
      currentDirection = moveUp
      break;
   case "ArrowDown":
      currentDirection = moveDown
      break;

    default:
      break;
  }
 })

initialCanvas()
// step()
gameInterval = setInterval(() => {
 // step()
}, 100);
function toKey([top, left]) {
  return top + '_' + left
}

