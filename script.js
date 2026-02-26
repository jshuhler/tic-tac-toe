// EVERYTHING


// GAMEBOARD
// using IIFE for a single gameboard instance
const createGameBoard = (function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < columns; col++)
            board[row].push([col]);
    };

    return { board };
});

// PLAYER CREATION
const createPlayer = function makePlayer(name) {
    playerOneName = "Player One";
    playerTwoName = "Player Two";
    const marker = ;

    return { playerName, marker };
}