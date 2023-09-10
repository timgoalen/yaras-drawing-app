/* Get HTML canvas element */
const canvas = document.getElementById("canvas");
/* Create context */
const ctx = canvas.getContext("2d");

/* Set canvas size */
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

/* Initial variables */
let isPainting = false;
let lineWidth = 15;
let startX;
let startY;
/* Line style */
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';
let colour = "";
ctx.strokeStyle = colour;
/* Shadow style */
ctx.shadowColor = "rgba(255, 192, 0, 0.5)";
ctx.shadowBlur = 3;

// Colour selectors
let colourChoiceBoxes = document.querySelectorAll("[data-colour]");

function colourClickHandler(event) {
  colourChoice = event.target.dataset.colour;
  console.log(colourChoice);
  colour = colourChoice;
}

colourChoiceBoxes.forEach(function(box) {
  box.addEventListener("click", colourClickHandler);
})

/* Main drawing function */
function drawLine(e) {
  if (!isPainting) {
    return;
  }
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
  ctx.stroke();
}

/* Event listeners */
canvas.addEventListener('mousedown', function(e) {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener('mouseup', function(e) {
  isPainting = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', drawLine);
