"use strict";

// GLOBAL CONSTANTS

/* Get HTML canvas element */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* Set canvas size */
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

const clearBtn = document.getElementById("clear-btn");
const downloadBtn = document.getElementById("download-btn");
const drawStyleBtns = document.querySelectorAll(".draw-style-btn");
const colourChoiceBoxes = document.querySelectorAll("[data-colour]");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close-btn");
const canvasImage = document.getElementById("canvas-image");
const downloadLink = document.getElementById("download-link");

// INITIAL VARIABLES

let isPainting = false;
let selectedLineWidth = 15;
let isSolidLine = "solid";
let selectedStrokeColour = "#F1F2EE";
let selectedShadowColour = "#F1F2EE";
let outlineInnerColour = "#F1F2EE";
let startX;
let startY;
/* Line style */
ctx.strokeStyle = selectedStrokeColour; /* colour, initially set to same as background */
ctx.lineWidth = selectedLineWidth;
ctx.lineCap = 'round';
ctx.lineJoin = "round";
/* Shadow style */
ctx.shadowColor = selectedShadowColour;
ctx.shadowBlur = 3;

// Draw-style choice

function setDrawStyle(event) {
  selectedLineWidth = event.target.dataset.linewidth;
  ctx.lineWidth = selectedLineWidth;

  isSolidLine = event.target.dataset.solidline;

  if (isSolidLine == "outline") {
    ctx.strokeStyle = outlineInnerColour;
  } else {
    selectedStrokeColour = selectedShadowColour;
    ctx.strokeStyle = selectedStrokeColour;
  }

  // Remove 'selected' class from all divs
  drawStyleBtns.forEach(btn => {
    btn.classList.remove("initial-selection");
    btn.classList.remove("draw-style-btn-clicked");
  })
  // Add selected class to clicked div
  event.target.classList.add("draw-style-btn-clicked");
}

drawStyleBtns.forEach(function (btn) {
  btn.addEventListener("click", setDrawStyle);
})

// Colour choice

function colourClickHandler(event) {
  if (isSolidLine == "outline") {
    ctx.strokeStyle = outlineInnerColour;
  } else {
    selectedStrokeColour = event.target.dataset.colour;
    ctx.strokeStyle = selectedStrokeColour;
  }
  selectedShadowColour = event.target.dataset.colour;
  ctx.shadowColor = selectedShadowColour;

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

// MAIN DRAWING FUNCTION

function drawLine(e) {
  if (!isPainting) {
    return;
  }
  // Check if the event is a touch event, and use the appropriate clientX and clientY values
  const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  const y = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

  ctx.lineTo(x - canvasOffsetX, y - canvasOffsetY);
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

clearBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// Download drawing function

downloadBtn.addEventListener("click", function() {

  const captureCanvas = canvas.toDataURL();

  modal.style.display = "grid";
  canvasImage.src = captureCanvas;

  downloadLink.download = 'yaras_drawing.png';
  downloadLink.href = captureCanvas;
  downloadLink.click();
})

modalCloseBtn.addEventListener("click", function() {
  modal.style.display = "none";
  // ***RUN THE INIT FUNCTION HERE AGAIN
})