// GAMEBOARD
const gameBoard = (function createGameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // creating board array
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < columns; col++)
            board[row].push(col); //change to push(col) to see col numbers in console
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
function gameController(row,col) {
    // manually creating two players
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let rowLookup = row - 1;
    let colLookup = col - 1;
    const playTurn = (player, rowLookup, colLookup, board) => {


        // checking for the correct board location
        console.log(gameBoard.board[rowLookup][colLookup]);
        console.log(`row: ${rowLookup}, col: ${colLookup}`);
        
        //replacing the existing board marker (blank) with the player marker (X or O)
        console.log(gameBoard.board);

    }
    return { playerOne, playerTwo, playTurn }
}

const game = gameController();

// DISPLAY CONTROLLER

