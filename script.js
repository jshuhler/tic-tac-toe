// GAMEBOARD
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // creating board array
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < columns; col++)
            board[row].push(`row:${row},col:${col}`); //change to push(col) to see col numbers in console
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

    // playing a turn
    const playTurn = (player, row, col, board) => {
        // checking for the correct board location and layout
        console.log(gameBoard.board[row][col]);
        console.log(gameBoard.board);

        //replacing the existing board marker (blank) with the player marker (X or O)
        gameBoard.board[row].splice(col,1,player.marker);
    }

    return { playerOne, playerTwo, playTurn };
}

const game = gameController();

// DISPLAY CONTROLLER


// CONSOLE TESTING

