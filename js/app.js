const game = new Game();
$('button#begin-game').on("click", function() {
    this.style.display = 'none';
    $('#play-area')[0].style.opacity = '1';
    game.startGame();
});

document.addEventListener('keydown', function(event){
    game.handleKeypress(event, game);
});