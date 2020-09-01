"use strict";


function drawRectangle(upperLeftCol, upperLeftRow,
    width, height, color)
{ 
    ctx.fillStyle = color
    ctx.fillRect(upperLeftCol, upperLeftRow, width, height);
    return ;
}

function canvasMouseClickHandler(event)
{
    var col = parseInt(event.clientX / WIDTHSCALE);
    var row = parseInt(event.clientY / HEIGHTSCALE);
    
    colLabel.innerHTML = col;
    rowLabel.innerHTML = row;

    return ;
}

