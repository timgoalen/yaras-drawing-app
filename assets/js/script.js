"use strict";

// -- GLOBAL CONSTANTS

// HTML canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// UI elements
const clearBtn = document.getElementById("clear-btn");
const downloadBtn = document.getElementById("download-btn");
const drawStyleBtns = document.querySelectorAll(".draw-style-btn");
const colourChoiceBoxes = document.querySelectorAll("[data-colour]");
// Modal elements
const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
// Image download elements
const canvasImage = document.getElementById("canvas-image");
const downloadLink = document.getElementById("download-link");
// Default magic values
const DEFAULT_LINE_WIDTH = 15;
const DEFAULT_BACKGROUND_COLOUR = "#F1F2EE";

// -- GLOBAL VARIABLES

let isPainting = false;
let selectedLineWidth = 0;
let isLineSolid = "";
let selectedStrokeColour = "";
let selectedShadowColour = "";
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// -- EVENT LISTENERS

// UI Elements:

clearBtn.addEventListener("click", initCanvasDefaults);
downloadBtn.addEventListener("click", downloadCanvas);
modalCloseBtn.addEventListener("click", closeModal);
drawStyleBtns.forEach(btn => btn.addEventListener("click", drawStyleClickHandler));
colourChoiceBoxes.forEach(box => box.addEventListener("click", colourClickHandler));

// Drawing events:

canvas.addEventListener("mousedown", startLineMouse);
canvas.addEventListener("touchstart", startLineTouch);

canvas.addEventListener("mousemove", drawLine);
canvas.addEventListener("touchmove", drawLine);

canvas.addEventListener("mouseup", endLine);
canvas.addEventListener("touchend", endLine);

// -- UTILITY FUNCTIONS

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fillCanvasBackgroundColour() {
    ctx.fillStyle = DEFAULT_BACKGROUND_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
     // Convert canvas to DataURL
     const capturedCanvas = canvas.toDataURL();
     // Open Modal and set image src
     modal.style.display = "grid";
     modalCloseBtn.style.display = "block";
     canvasImage.src = capturedCanvas;
     // Create download link and simulate click
     downloadLink.download = 'yaras_drawing.png';
     downloadLink.href = capturedCanvas;
     downloadLink.click();
}

function closeModal() {
    modal.style.display = "none";
    modalCloseBtn.style.display = "none";
    initCanvasDefaults();
}

function setLineWidth(click) {
    selectedLineWidth = click.target.dataset.linewidth;
    ctx.lineWidth = selectedLineWidth;
}

function setLineSolidity(click) {
    isLineSolid = click.target.dataset.solidline;
}

function setStrokeToInvisible() {
    ctx.strokeStyle = DEFAULT_BACKGROUND_COLOUR;
}

function usePreviousColour() {
    selectedStrokeColour = selectedShadowColour;
    ctx.strokeStyle = selectedStrokeColour;
}

function checkOutlineChoiceForDrawStyle() {
    if (isLineSolid == "outline") {
        setStrokeToInvisible();
    } else {
        usePreviousColour();
    }
}

function checkOutlineChoiceForColour(click) {
    if (isLineSolid == "solid") {
        setStrokeColour(click);
    } else {
        setStrokeToInvisible();
    }
}

function setDefaultSelectionUI(nodeList) {
    nodeList[1].classList.add("default-selection");
}

function clearSelectionUI(nodeList) {
    for (let node of nodeList) {
        node.classList.remove("default-selection");
        node.classList.remove("user-selection-btn-clicked");
    }
}

function setUserSelectionUI(click) {
    click.target.classList.add("user-selection-btn-clicked");
}

function setStrokeColour(click) {
    selectedStrokeColour = click.target.dataset.colour;
    ctx.strokeStyle = selectedStrokeColour;
}

function setShadowColour(click) {
    selectedShadowColour = click.target.dataset.colour;
    ctx.shadowColor = selectedShadowColour;
}

function checkForTouchDevice(event) {
    if (event.type.startsWith("touch")) {
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
    } else {
        endX = event.clientX;
        endY = event.clientY;
    }
}

// -- MAIN PROCEDURAL FUNCTIONS

function initCanvasDefaults() {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Clear canvas and paint background colour
    clearCanvas();
    fillCanvasBackgroundColour();
    // Set default line style
    selectedLineWidth = DEFAULT_LINE_WIDTH;
    ctx.lineWidth = selectedLineWidth;
    isLineSolid = "solid";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Re-set UI selections
    clearSelectionUI(drawStyleBtns);
    clearSelectionUI(colourChoiceBoxes);
    setDefaultSelectionUI(drawStyleBtns);
    // Set default line colour
    selectedStrokeColour = DEFAULT_BACKGROUND_COLOUR;
    ctx.strokeStyle = selectedStrokeColour;
    // Set default line shadow
    selectedShadowColour = DEFAULT_BACKGROUND_COLOUR;
    ctx.shadowColor = selectedShadowColour;
    ctx.shadowBlur = 3;
}

function drawStyleClickHandler(click) {
    setLineWidth(click);
    setLineSolidity(click);
    checkOutlineChoiceForDrawStyle();
    clearSelectionUI(drawStyleBtns);
    setUserSelectionUI(click);
}

function colourClickHandler(click) {
    checkOutlineChoiceForColour(click);
    setShadowColour(click);
    clearSelectionUI(colourChoiceBoxes);
    setUserSelectionUI(click);
}

// DRAWING FUNCTIONS

function startLineMouse(event) {
    isPainting = true;
    startX = event.clientX;
    startY = event.clientY;
}

function startLineTouch(event) {
    // Prevent default touch action (scrolling)
    event.preventDefault();
    isPainting = true;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function drawLine(event) {
    if (!isPainting) {
        return;
    }
    checkForTouchDevice(event);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function endLine() {
    isPainting = false;
    ctx.beginPath();
}

// Run INIT function on document load
document.addEventListener("DOMContentLoaded", initCanvasDefaults)