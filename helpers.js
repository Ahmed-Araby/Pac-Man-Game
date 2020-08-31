"use strict";


function drawRectangle(upperLeftCol, upperLeftRow,
    width, height, color)
{ 
    ctx.fillStyle = color
    ctx.fillRect(upperLeftCol, upperLeftRow, width, height);
    return ;
}

function canvasMouseClick(event)
{
    var col = parseInt(event.clientX / colScale);
    var row = parseInt(event.clientY / rowScale);
    
    colLabel.innerHTML = col;
    rowLabel.innerHTML = row;
    
    return ;
}

