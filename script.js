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
const createPlayer = function makePlayer(name) {
    const playerName = name;

    return { playerName };
}

// GAME CONTROLLER
function gameController() {

}

// DISPLAY CONTROLLER

