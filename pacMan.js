"use strict";

class pacMan
{
    constructor(colCenter, rowCenter)
    {
        this.colCenter = colCenter
        this.rowCenter = rowCenter;
        this.circleRadius = CIRCLERADIUS;
        this.lastPressedKey = "";
        this.mothState = "close";
        return ;
    }

    getDelte(pressedKey)
    {
        var dCol = 0;
        var dRow = 0;

        if(pressedKey == 'up')
            dRow = -1;
        else if(pressedKey == 'down')
            dRow = 1;
        else if(pressedKey == 'left')
            dCol = -1;
        else if(pressedKey == 'right')
            dCol = 1;
        return Array(dCol, dRow);
    }

    getPixel(maze, col, row)
    {
        col = parseInt(col);
        row = parseInt(row);
        return maze[col][row];
    }

    testMove(maze, dCol, dRow)
    {
        /*
        if the next complete move 
        will be for a cell with a wall or 
        out of the maze boundary 

        prevent the move, no need for actual circle, 
        rectangele collision detection  
        this simplicity comming from that the circle radius is half
        of the square dimension , other wise we would do actual collision detection.
        */
       
        var newColCenter = this.colCenter  + dCol;
        var newRowCenter = this.rowCenter  + dRow;

        var newCol = parseInt(this.colCenter  + dCol);
        var newRow = parseInt(this.rowCenter  + dRow);

        // out of the boundary
        if(newColCenter < 0 || newCol >= CANVASACTUALWIDTH ||
            newRowCenter < 0 || newRow >= CANVASACTUALHEIGHT)
            return false;
        // cell with a wall
        if(maze[newCol][newRow] == 0)
            return false;
            
        /*
        confirm the move 
        */
        return true;
    }

        
    getRotationAngle()
    {
        /*
        use last pressed key
        to determine the direction of the open mouth  
        */
        if(this.lastPressedKey =='up')
            return 1/2 * Math.PI;
        else if(this.lastPressedKey == 'left')
            return 1 * Math.PI;
        else if(this.lastPressedKey == 'right')
            return 0;
        else if(this.lastPressedKey == 'down')
            return 3/2 * Math.PI;
        else 
            return 0;
            //throw "un expected case";
    }

    drawArc(colCenter, rowCenter, radius , startAngle,  endAngle, rotation)
    {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(colCenter , rowCenter , radius , startAngle - rotation ,
            endAngle - rotation);

        ctx.fill();
        return ;
    }

    update(currentPressedKey, maze)
    {
        // * command 
        // game didn't start yet
        if(this.lastPressedKey =="" && currentPressedKey =="")
            return ;

        // first move ever 
        else if(this.lastPressedKey =="")
            this.lastPressedKey = currentPressedKey;
        
        /*
        in case the user didn't pressed any keys 
        keep going in the current direction 
        */
        if(currentPressedKey == "")
            currentPressedKey = this.lastPressedKey;

        var dCol = 0;
        var dRow = 0;
        var delteArray = this.getDelte(currentPressedKey);
        dCol = delteArray[0];
        dRow = delteArray[1];

        // * test move 
        if(this.testMove(maze, dCol, dRow) == true)
        {
            // * apply the move
            this.colCenter += dCol / 1;
            this.rowCenter += dRow / 1;
            this.lastPressedKey = currentPressedKey;
        }

        // * test move
        else if(currentPressedKey !=this.lastPressedKey)
        {
            /*
            use last pressed key

            * apply the move
            */
           delteArray = this.getDelte(this.lastPressedKey);
           dCol = delteArray[0];
           dRow = delteArray[1];
           if(this.testMove(maze, dCol, dRow) == true)
           {
                this.colCenter += dCol / 1;
                this.rowCenter += dRow / 1;
           }  
        }
        return ;
    }


    render()
    {
        /*
        we could apply state pattern here 
        but the function is very small so no need fo this
        */

        if(this.mothState == 'close')
        {
            this.drawArc(this.colCenter , this.rowCenter , this.circleRadius ,
                     0 , 2*Math.PI, 0);
            this.mothState = 'open';
        }

        else
        {
            var rotationAngle = this.getRotationAngle();
            // 1 - draw arch1 A1 
            this.drawArc(this.colCenter, this.rowCenter, this.circleRadius, 
                Math.PI / 2, 3/2*Math.PI, rotationAngle);
            // 2 - draw arch2 A2 
            this.drawArc(this.colCenter, this.rowCenter, this.circleRadius,
                 Math.PI / 4, 5/4 * Math.PI, rotationAngle);
            // 3 - draw arch3 A3 
            this.drawArc(this.colCenter, this.rowCenter, this.circleRadius,
                 3/4 * Math.PI, 7/4 * Math.PI, rotationAngle);
            this.mothState = 'close';
        }

        return ;
    }
}