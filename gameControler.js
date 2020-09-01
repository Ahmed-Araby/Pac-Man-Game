"use strict";

class manger
{
    constructor()
    {
        this.mazeObj = new mazeGenerator(CANVASACTUALWIDTH, CANVASACTUALHEIGHT);
        this.mazeObj.recursiveDivision(new vector(0, 0),
                                  new vector(CANVASACTUALWIDTH, CANVASACTUALHEIGHT),
                                  'vertical');
        
        var validPosition = this.mazeObj.pacManPosition();
        var colCenter = validPosition[0];
        var rowCenter = validPosition[1];
        this.pacMan = new pacMan(colCenter, rowCenter);
        this.currentPressedKey = "";
    }  

    setCurrentPressedKey(currentPressedKey)
    {
        this.currentPressedKey = currentPressedKey;
    }

    collisionDetection()
    {

        // pacMan vs ghost 
        
        // pacMan vs food 

        // pacMan vs walls 

    }

    update()
    {
        // update the maze 

        // update pac-man 
        this.pacMan.update(this.currentPressedKey, this.mazeObj.maze);

        // update food 

        // update ghosts 

        // update HTML variables

        return ;
    }

    render()
    {
        // redner the maze 
        this.mazeObj.renderMaze();
        
        // redner pacMan 
        this.pacMan.render();

        // render food
    
        // render ghosts 

        // render html

        return ;
    }

    verifyMaze()
    {
        var col = parseInt(colLabel.innerHTML);
        var row = parseInt(rowLabel.innerHTML);
        var message = "";
        if(isNaN(col) == true || isNaN(row) == true){
            message = "Click on the canvas";
        }
        else 
            message = this.mazeObj.testMazeConnectivity(col, row);
        var divElement = document.getElementById('res');
        divElement.innerHTML = message;
        return ;
    }


    gameLoop()
    {
        // listem to input
        this.update();
        this.render();
        this.collisionDetection();
    }

}


var mangerObj = new manger();

// handle events
document.onkeydown = function(e) {
    var currentPressedKey = "";
    switch (e.keyCode) { 
        case 37: 
            currentPressedKey = 'left';
            break; 
        case 38: 
            currentPressedKey = 'up'; 
            break; 
        case 39: 
            currentPressedKey = 'right'; 
            break; 
        case 40: 
            currentPressedKey = 'down'; 
            break;
    }
    mangerObj.setCurrentPressedKey(currentPressedKey);
}

canvas.addEventListener('click', canvasMouseClickHandler);



// start the game 
setInterval(() => {
    mangerObj.gameLoop();
}, 1000 / FPS);