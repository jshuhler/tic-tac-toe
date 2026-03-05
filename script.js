// GAMEBOARD
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // creating board array
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < columns; col++)
            board[row].push("_"); //change to push(col) to see col numbers in console
    };

    // printing the game board to the console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell))
        console.log(boardWithCellValues);
    };

    return { board, printBoard };
})();

// PLAYER CREATION
const createPlayer = function makePlayer(name, marker) {

    return { name, marker };
}

// GAME CONTROLLER
function gameController(row,col,board) {
    // manually creating two players
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    const players = [playerOne, playerTwo];
    var activePlayer = players[0];

    // playing a turn
    const playTurn = (player, row, col) => {
        // checking for the correct board location and layout
        console.log(gameBoard.board[row][col]);
        console.log(gameBoard.board);

        //replacing the existing board marker (blank) with the player marker (X or O)
        if (gameBoard.board[row][col] === "_") {
            gameBoard.board[row].splice(col,1,player.marker);
            checkWinner();
        } else {
            console.log("That space is already taken, try again");
        }
        if (checkWinner() === true) {
                console.log("Winner winner chicken dinner")
        };
    };

    // check if someone has won, will need to be called after each turn
    const checkWinner = () => {
        // checking row winner
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === activePlayer.marker && gameBoard.board[i][1] === activePlayer.marker && gameBoard.board[i][2] === activePlayer.marker) {
                // console.log("Holy shit you won dude");
                return true;
            };
        };

        // checking col winner
        for (let j = 0; j < 3; j++) {
            if (gameBoard.board[0][j] === activePlayer.marker && gameBoard.board[1][j] === activePlayer.marker && gameBoard.board[2][j] === activePlayer.marker) {
                // console.log("Oh fuck it goes up and down too??");
                return true;
            };
        };

        // checking diagonal winner
        if (gameBoard.board[0][0] === activePlayer.marker && gameBoard.board[1][1] === activePlayer.marker && gameBoard.board[2][2] === activePlayer.marker) {
            // console.log("Top left to bottom right, fancy shit.");
            return true;
        } else if (gameBoard.board[0][2] === activePlayer.marker && gameBoard.board[1][1] === activePlayer.marker && gameBoard.board[2][0] === activePlayer.marker) {
            // console.log("Top right to bottom left this time. You cheeky bitch.");
            return true;
        };
    };

    return { playerOne, playerTwo, playTurn };
}

const game = gameController();

// DISPLAY CONTROLLER


// CONSOLE TESTING

