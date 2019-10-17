class Token{
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    drawHTMLToken(offset = 0, columns = 7){
        this.token = document.createElement("div");
        this.token.setAttribute('id', this.id);
        this.token.setAttribute('class', 'token');
        this.token.style.backgroundColor = this.owner.color;
        $('#game-board-underlay')[0].appendChild(this.token);
        for(var i = 0; i < offset; i++){
            this.moveRight(columns);
        }
    }

    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    moveLeft(){
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }
    
    moveRight(columns){
        if(this.columnLocation < columns - 1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }

    drop(target, reset){
        this.dropped = true;
        $(this.htmlToken).animate({top: target.y * target.diameter}, 750, "easeOutBounce", reset);
    }

    get htmlToken(){
        return this.token;
    }
}