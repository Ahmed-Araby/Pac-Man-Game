"use strict";

class vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class mazeGenerator
{
    constructor(canvasWidth, canvasHeight
        , maxCoridersCount = 1, coriderPresentage = 0.2, wallImagePath = WALLIMAGEPATH)
    {
        /*
        boolean array that represent the maze
        1 ->> is a corider 
        0 ->> is a wall
        */

        this.maze = []; // supposed to be a 2D array  
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxCoridersCount = maxCoridersCount;
        this.coriderPresentage = coriderPresentage;
        this.wallImage = new Image(MAZECELLWIDTH, MAZECELLHEIGHT);
        this.wallImage.src = wallImagePath;

        /*
        initialize the maze as full opened 
        is very crusical, as we leave a col, row between consecutive walls
        in canvas manner 
        */
 
        for(var col=0; col<canvasWidth; col++)
        {
            this.maze.push([]); 
            for(var row=0; row<canvasHeight; row++)
                this.maze[col].push(1);
        }
        return ;
    }

    putImageIntoCanvas(col, row, image)
    {
        /*
        take into account the lag for loading the image 
        into the browser.
        */

        if(!image.complete){
            setTimeout(() => {
                this.putImageIntoCanvas(col, row, image);
            }, 50);
            return ;
        }

        ctx.drawImage(image, col, row, 1, 1);
        return ;
    }

    getRandomCol(startCol, endCol)
    {
        // presentage of the distance ->> actual point
        // end col is excluded

        var randCol = Math.random() * (endCol - startCol) + startCol;
        return parseInt(randCol);
    }
    
    getRandomRow(startRow, endRow)
    {
        // presentage of the distance ->> actual point 
        // end row is excluded

        var randRow = Math.random() * (endRow - startRow) + startRow;
        return parseInt(randRow); 
    }

    paintCol(startPoint, endPoint, col)
    {
        // endrow is excluded
        var coriderCnt = 0;

        for(var row = startPoint.y; row<endPoint.y; row++){
            
            // put a wall
            this.maze[col][row] = 0;
            
            // put corider
            if(coriderCnt < this.maxCoridersCount){
                var randNum = Math.random();
                if(randNum < this.coriderPresentage){
                    coriderCnt +=1;
                    this.maze[col][row] = 1;
                }

                // have to have at least one 
                else if(row + 1 == endPoint.y){
                    coriderCnt +=1;
                    this.maze[col][row] = 1;
                }
            }
        }
        return ;
    }

    paintRow(startPoint , endPoint , row)
    {
        // end col is not inlcuded 
        var coriderCnt = 0;

        for(var col = startPoint.x; col < endPoint.x; col++){
            this.maze[col][row] = 0;

            if(coriderCnt < this.maxCoridersCount){
                var randNum = Math.random();
                if(randNum < this.coriderPresentage){
                    coriderCnt +=1;
                    this.maze[col][row] = 1;
                }
                else if(col + 1 == endPoint.x){
                    coriderCnt +=1;
                    this.maze[col][row] = 1;
                }
            }
        }
        return;

    }

    recursiveDivision(startPoint , endPoint,
         divisionDirection = 'vertical')
    {
        // base case, same col or row 
        if(startPoint.x+1 >= endPoint.x 
            || startPoint.y+1 >= endPoint.y)
        {
            return ;
        }
        
        // vertical division
        if(divisionDirection == 'vertical')
        {
            var splitCol = this.getRandomCol(startPoint.x, endPoint.x); 
            this.paintCol(startPoint, endPoint, splitCol);
 
            // recurse left
            var splitPoint = new vector(splitCol - 1 , endPoint.y);
            this.recursiveDivision(startPoint, splitPoint, 'horizontal');

            // recurse right
            splitPoint = new vector(splitCol + 2, startPoint.y);
            this.recursiveDivision(splitPoint, endPoint, 'horizontal');

            return ;
        }

        // horizontal division
        else
        {
            var splitRow = this.getRandomRow(startPoint.y, endPoint.y);
            this.paintRow(startPoint, endPoint, splitRow);

            // recurse up 
            var splitPoint = new vector(endPoint.x, splitRow -1);
            this.recursiveDivision(startPoint, splitPoint, 'vertical');

            // recurse down 
            splitPoint = new vector(startPoint.x, splitRow + 2);
            this.recursiveDivision(splitPoint, endPoint, 'vertical');
            
            return;
        }
        return ;
    }

    renderMaze()
    {
        for(var col = 0; col<this.canvasWidth; col++){
            for(var row= 0; row <this.canvasHeight; row++){
                if(this.maze[col][row]==1){ // this was the bug !!! , wrong order of col and row into the brackets
                    drawRectangle(col ,row, 1, 1, 'black');
                }
                else{
                    // draw wall
                    this.putImageIntoCanvas(col, row, this.wallImage);

                    // draw rectangle
                    //drawRectangle(col, row, 1, 1, 'red');
                }
            }
        }
        return ;
    }

    getPixel(col, row)
    {
        // canvas manner 
        return this.maze[col][row];
    }

    pacManPosition()
    {
        for(var col = 0; col<this.canvasWidth; col++)
        {
            for(var row=0; row<this.canvasHeight; row++)
            {
                if(this.maze[col][row] == 1)
                {
                    // center of the circle
                    return Array(col + 0.5, row + 0.5);
                }
            }
        }
        throw "there is not valid position for pacMan";
    }

    applySpecialChangeToTheMaze()
    {
        // mark satrt and end points as free point

        // put walls on the sides 
        
        // put free enters on the corners
        throw "not implemented yet"; 

    }
    dfs(col, row, visited)
    {
        if(col < 0 || col >=this.canvasWidth)
            return 0;
        else if(row < 0 || row >= this.canvasHeight)
            return 0;
        else if(this.getPixel(col, row) == 0 || visited[col][row] ==1)
            return 0;
        
        var tmpWhiteCount = 1; // me 
        visited[col][row] =1;

        // flood fill 
        tmpWhiteCount += this.dfs(col+1, row, visited) +
                         this.dfs(col-1, row, visited) + 
                         this.dfs(col, row+1, visited) +
                         this.dfs(col , row-1, visited);
        return tmpWhiteCount;
    }

    testMazeConnectivity(mouseCol, mouseRow)
    {
        if(this.getPixel(mouseCol, mouseRow) == 0){
            return "error: you clicked a wall "
        }
        else{
            var visited = [];
            var actualWhiteCount = 0;

            for(var col = 0; col<this.canvasWidth; col+=1){
                visited.push([]);
                for(var row=0; row<this.canvasHeight; row+=1){
                    visited[col].push(0);
                    if(this.getPixel(col, row) == 1)
                        actualWhiteCount +=1;
                }
            }

            var dfsWhiteCount = this.dfs(mouseCol, mouseRow, visited);
            if(dfsWhiteCount == actualWhiteCount){
                console.log("correct maze");
                return "the maze represent a connected undirected graph";
            }
            else{
                console.log("bad maze");
                return "dfsWhiteCount " + dfsWhiteCount + 
                "actualWhiteCount " + actualWhiteCount + 
                " the maze is not a connected graph"
            }
        }

        return ;
    }
}
