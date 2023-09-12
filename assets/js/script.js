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
let solidLine = false;
let setLineWidth = 15;
let startX;
let startY;
/* Line style */
ctx.strokeStyle = "";
ctx.lineCap = 'round';
ctx.lineJoin = "round";
/* Shadow style */
// ctx.shadowColor = "rgba(255, 192, 0, 0.4)";
ctx.shadowBlur = 3;

// Draw-style options
function setDrawStyle(event) {
  setLineWidth = event.target.dataset.linewidth;
  solidLine = event.target.dataset.solidline;
  // if (solidLine == false) {
  //   ctx.strokeStyle = "white";
  // }
}

const drawStyleBtns = document.querySelectorAll(".draw-style-btn");

drawStyleBtns.forEach(function (btn) {
  btn.addEventListener("click", setDrawStyle);
})

// Colour selectors
const colourChoiceBoxes = document.querySelectorAll("[data-colour]");

function colourClickHandler(event) {
  ctx.strokeStyle = event.target.dataset.colour;
  ctx.shadowColor = event.target.dataset.colour;
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
  // Check if the event is a touch event, and use the appropriate clientX and clientY values
  const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  const y = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

  ctx.lineTo(x - canvasOffsetX, y - canvasOffsetY);
  ctx.lineWidth = setLineWidth;
  if (solidLine == false) {
    ctx.strokeStyle = "white";
  }
  ctx.stroke();
}

/* Event listeners for both mouse and touch events */
canvas.addEventListener('mousedown', function (e) {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener('touchstart', function (e) {
  // Prevent the default touch action (e.g., scrolling)
  e.preventDefault();

  isPainting = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

canvas.addEventListener('mouseup', function (e) {
  isPainting = false;
  ctx.beginPath();
});

canvas.addEventListener('touchend', function () {
  isPainting = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('touchmove', drawLine);

// Clear canvas function
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})