"use strict";


var can = document.getElementById('can');
var ctx = can.getContext('2d');
var colLabel = document.getElementById("colLabel");
var rowLabel = document.getElementById("rowLabel");

// setting the canvas width and height 
can.width = 600;
can.height = 600;


var colScale = 20;
var rowScale = 20;


var WALLIMAGEPATH = "./wall.png";

var MAZECELLWIDTH = 20;
var MAZECELLHEIGHT = 20;

var CANVASACTUALWIDTH = can.width / colScale;
var CANVASACTUALHEIGHT = can.height / rowScale;

var FPS = 30;