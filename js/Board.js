class Board{
    constructor(){
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }

    createSpaces(){
        const spaces = [];
        for(let i = 0; i < this.columns; i++){
            let column = [];
            for(let j = 0; j < this.rows; j++){
                let space = new Space(i, j);
                column.push(space);
            }
            spaces.push(column);
        }
        return spaces;
    }

    drawHTMLBoard(){
        for(let i = 0; i < this.columns; i++){
            for(let j = 0; j < this.rows; j++){
                this.spaces[i][j].drawSVGSpace();
            }
        }
    }
}