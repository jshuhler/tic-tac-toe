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
    let activePlayer = players[0];

    // playing a turn
    const playTurn = (player, row, col) => {
        // checking for the correct board location and layout
        console.log(gameBoard.board);

        //replacing the existing board marker (blank) with the player marker (X or O)
        if (gameBoard.board[row][col] === "_") {
            gameBoard.board[row].splice(col,1,player.marker);
            checkWinner();
            console.log(activePlayer);
        } else {
            console.log("That space is already taken, try again");
        }

        if (checkWinner() === true) {
            console.log("Winner winner chicken dinner")
        };

        if (checkTie() === true) {
            console.log("This game ends in a draw!");
        }
        switchPlayerTurn();
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

    // checking if there is a tie
    const checkTie = () => {
        const gameDraw = gameBoard.board.every((row) => row.every(cell => cell !== "_"));
        return gameDraw;
    }

    // switching the active player
    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        };
    };

    return { playerOne, playerTwo, playTurn, activePlayer };
};

const game = gameController();

// DISPLAY CONTROLLER

function displayController() {
    
    // creating the grid spaces within `grid-container`
    const drawBoard = (arr) => {
        const gridContainer = document.querySelector('.grid-container');
        console.log(gameBoard.board);

        for (let i = 0; i < arr.length; i++) {
            const rowNum = arr[i];
            for (let j = 0; j < rowNum.length; j++) {
                const gridSpace = document.createElement('div');
                gridSpace.classList = "grid-space";

                // gridSpace.textContent = player.marker;
                // gridSpace.textContent = `r:${[i]}, c:${[j]}`;
                gridContainer.appendChild(gridSpace);
            }
        }
        // event listeners for the gridSpace clicks
        gridSpace.addEventListener('click', () => {
            gridSpace.textContent = `${player.marker}`;
        })
    }

    drawBoard(gameBoard.board);
}

const display = displayController();