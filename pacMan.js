"use strict";

class pacMan
{
    constructor(colCenter, rowCenter)
    {
        /*
        col and row 
        are determined by the game controller 
        as it's an empty cell from wall and food.
        */

        this.colCenter = colCenter
        this.rowCenter = rowCenter;
        this.circleRadius = 0.5;
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

    checkPosition(maze, dCol, dRow)
    {
        if(this.colCenter + dCol >=0 &&
            this.colCenter +  dCol <= CANVASACTUALWIDTH && 
            this.rowCenter + dRow >=0 &&
            this.rowCenter + dRow <= CANVASACTUALHEIGHT && 
            this.getPixel(maze, this.colCenter + dCol, this.rowCenter + dRow)==1)
            return true;
        return false;
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

        if(this.checkPosition(maze, dCol, dRow) == true)
        {
            this.colCenter += dCol / 4;
            this.rowCenter += dRow / 4;
            this.lastPressedKey = currentPressedKey;
        }

        else if(currentPressedKey !=this.lastPressedKey)
        {
            /*
            use last pressed key
            */
           delteArray = this.getDelte(this.lastPressedKey);
           dCol = delteArray[0];
           dRow = delteArray[1];
           if(this.checkPosition(maze, dCol, dRow) == true)
           {
                this.colCenter += dCol / 4;
                this.rowCenter += dRow / 4;
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