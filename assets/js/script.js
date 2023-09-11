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
ctx.lineJoin = "round";
// let colour = "";
ctx.strokeStyle = "white";
/* Shadow style */
ctx.shadowColor = "rgba(255, 192, 0, 0.4)";
// ctx.shadowColor = "rgba(0, 255, 255, 0.2)";
ctx.shadowBlur = 3;

// Colour selectors
const colourChoiceBoxes = document.querySelectorAll("[data-colour]");

function colourClickHandler(event) {
  ctx.strokeStyle = event.target.dataset.colour;
  // ctx.shadowColor = event.target.dataset.colour;
  // Remove 'selected' class from all divs
  colourChoiceBoxes.forEach(box => {
    box.classList.remove("colour-box-clicked");
  })
  // Add selected class to clicked div
  event.target.classList.add("colour-box-clicked");
}

colourChoiceBoxes.forEach(function (box) {
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
canvas.addEventListener('mousedown', function (e) {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener('mouseup', function (e) {
  isPainting = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', drawLine);