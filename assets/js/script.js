/* Get HTML canvas element */
const canvas = document.getElementById("canvas");
/* Create context */
const ctx = canvas.getContext("2d");

// Get Colour blocks
// FROM TUTORIAL:
// Selecting all the div that has a class of clr
let colours = document.querySelectorAll(".colour");
// Converting NodeList to Array
coloursArray = Array.from(colours)

coloursArray.forEach(colour => {
  colour.addEventListener("click", () => {
      console.log("yeahyea");
      ctx.strokeStyle = colour.dataset.colour;
    })
})

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
ctx.strokeStyle = "rgba(255, 192, 203, 1)";
/* Shadow style */
ctx.shadowColor = "rgba(255, 192, 0, 0.5)";
ctx.shadowBlur = 3;

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
