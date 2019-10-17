class Game{
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    createPlayers(){
        const players = [];
        players.push(new Player('Player 1', 1, '#e15258', true));
        players.push(new Player('Player 2', 2, '#e59a13'));
        return players;
    }

    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    handleKeypress(e){
        let location = this.activePlayer.activeToken.columnLocation;
        var counter;
        if(this.ready){
            if(e.key == "ArrowLeft"){
                for(counter = 1; location - counter >= 0; counter++)
                    if(this.board.spaces[location - counter][0].token == null)
                        break;
                if(location - counter >= 0)
                    for(let i = 0; i < counter; i++)
                        this.activePlayer.activeToken.moveLeft(this.board.columns);
            }
            else if(e.key == "ArrowRight"){
                for(counter = 1; location + counter < this.board.columns; counter++)
                    if(this.board.spaces[location + counter][0].token == null)
                        break;
                if(location + counter < this.board.columns)
                    for(let i = 0; i < counter; i++)
                        this.activePlayer.activeToken.moveRight(this.board.columns);
            }
            else if(e.key == "ArrowDown"){
                this.playToken();
            }
        }
        else{
            if(e.key == "Enter"){ 
                this.reset();
            }
        }
    }

    playToken(){
        const game = this;
        const currentToken = this.activePlayer.activeToken;
        const column = currentToken.columnLocation;
        if(this.board.spaces[column][0].token == null){
            for(let i = this.board.rows - 1; i >= 0; i--){
                if(this.board.spaces[column][i].token == null){
                    const targetSpace = this.board.spaces[column][i];
                    this.ready = false;
                    currentToken.drop(targetSpace, game.updateGameState(currentToken, targetSpace));
                    return;
                }
            }
        }
        else
            return;
    }

    switchPlayers(){
        for(let player of this.players)
            player.active = !player.active;
    }

    checkForWin(target){
        const owner = target.token.owner;
        const x = target.x;
        const y = target.y;
        let count = -1;
        // horizontal
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x + i][y].owner == owner)
                count++;
            else
                break;
            if(x + (i + 1) >= this.board.columns)
                break;    
        }
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x - i][y].owner == owner)
                count++;
            else
                break;
            if(x - (i + 1) < 0)
                break;
        }
        if(count >= 4)
            return true;

        // vertical    
        count = -1;    
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x][y + i].owner == owner)
                count++;
            else
                break;
            if(y + (i + 1) >= this.board.rows)
                break;
        }
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x][y - i].owner == owner)
                count++;
            else
                break;
            if(y - (i + 1) < 0)
                break;
        }
        if(count >= 4)
            return true;

        // diagonal (/)
        count = -1;    
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x + i][y + i].owner == owner)
                count++;
            else
                break;
            if(x + (i + 1) >= this.board.columns || y + (i + 1) >= this.board.rows)
                break;
        }
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x - i][y - i].owner == owner)
                count++;
            else
                break;
            if(x - (i + 1) < 0 || y - (i + 1) < 0)
                break;
        }
        if(count >= 4)
            return true; 

        // diagonal (\)
        count = -1;    
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x - i][y + i].owner == owner)
                count++;
            else
                break;
            if(x - (i + 1) < 0 || y + (i + 1) >= this.board.rows)
                break;
        }
        for(let i = 0; i < 4; i++){
            if(this.board.spaces[x + i][y - i].owner == owner)
                count++;
            else
                break;
            if(x + (i + 1) >= this.board.columns || y - (i + 1) < 0)
                break;
        }
        if(count >= 4)
            return true;    
           
        // no matches            
        return false;
    }

    gameOver(message){
        $('#game-over')[0].style.display = 'block';
        $('#game-over')[0].textContent = message;  
    }

    updateGameState(token, target){
        target.mark(token);
        if(this.checkForWin(target))
            this.gameOver(this.activePlayer.name + " wins!");
        else{    
            this.switchPlayers();
            if(this.activePlayer.checkTokens()){
                var nextColumn = 0;
                for(nextColumn; nextColumn < this.board.columns; nextColumn++)
                    if(this.board.spaces[nextColumn][0].token == null)
                        break;
                this.activePlayer.activeToken.drawHTMLToken(nextColumn);
                this.ready = true;
            }
            else    
                this.gameOver("Stalemate.");
        }
    }

    get activePlayer(){
        return this.players.find(player => player.active);
    }

    reset(){
        $('#game-over')[0].style.display = 'none';
        // remove tokens
        for(let i = 0; i < this.players.length; i++){
            var tokens = this.players[i].tokens;
            for(let j = 0; j < tokens.length; j++){
                if(tokens[j].token != null)
                    $(tokens[j].token).remove();
            }
        }
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
        this.startGame();
    }
}