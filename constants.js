"use strict";

// html elements
var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
var colLabel = document.getElementById("colLabel");
var rowLabel = document.getElementById("rowLabel");

// setting the canvas width and height 
canvas.width = 600;
canvas.height = 600;

// PIXEL scale
var WIDTHSCALE = 20;
var HEIGHTSCALE = 20;

// new actual width and height
var CANVASACTUALWIDTH = canvas.width / WIDTHSCALE;
var CANVASACTUALHEIGHT = canvas.height / HEIGHTSCALE;

var MAZECELLWIDTH = 20;
var MAZECELLHEIGHT = 20;

var CIRCLERADIUS = 0.5;

var FPS = 7;
var STEP = 4;
// images paths
var WALLIMAGEPATH = "./wall.png";



// operations
// scale the pixel size in the canvas 
ctx.scale(WIDTHSCALE, HEIGHTSCALE);




