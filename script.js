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
    }

    // check if someone has won, will need to 
    // be called after each turn I think
    const checkWinner = (player) => {
        // checking row winner
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === player.marker && gameBoard.board[i][1] === player.marker && gameBoard.board[i][2]) {
                return true;
            }
        }

        // checking col winner


        // checking diagonal winner
    }

    return { playerOne, playerTwo, playTurn };
}

const game = gameController();

// DISPLAY CONTROLLER


// CONSOLE TESTING

