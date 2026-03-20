// GAMEBOARD
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // creating board array
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < columns; col++)
            board[row].push(""); //change to push(col) to see col numbers in console
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
function gameController() { // removed `row,col,board` from parameters that weren't being used
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
        if (gameBoard.board[row][col] === "") {
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
        return gameBoard.board.every((row) => row.every(cell => cell !== ""));
    }

    // switching the active player
    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        };
    };

    // getting activePlayer out of closure? maybe?
    const getActivePlayer = () => activePlayer;

    // function to run when checkWinner === true in drawBoard
    const winnerRoutine = () => {

    }

    return { players, playerOne, playerTwo, playTurn, activePlayer, switchPlayerTurn, getActivePlayer, checkWinner, checkTie, winnerRoutine };
};

const game = gameController();

// DISPLAY CONTROLLER

function displayController() {
    const messageContainer = document.querySelector('.message-container');
    const gridContainer = document.querySelector('.grid-container');
    const clearContainer = document.querySelector('.clear-container')
    
    // creating the grid spaces within `grid-container`
    const drawBoard = (arr) => {
        // creating and selecting elements
        const gameMessage = document.createElement("div");

        for (let i = 0; i < arr.length; i++) {
            const rowNum = arr[i];
            for (let j = 0; j < rowNum.length; j++) {
                const gridSpace = document.createElement('div');
                gridSpace.classList = "grid-space";
                gridSpace.setAttribute("data-row", [i]); // the 2nd part of the data attribute needs to be updated here. 
                gridSpace.setAttribute("data-col", [j]);
                gridContainer.appendChild(gridSpace);

                // event listeners for the gridSpace clicks
                // does this need to be inside this for loop or even the drawBoard function?
                gridSpace.addEventListener('click', (e) => {
                    if (gridSpace.textContent === "") {
                        gridSpace.textContent = game.getActivePlayer().marker;

                        // checking current values in console
                        console.log(`Last turn taken by: ${game.getActivePlayer().name}, playing with ${game.getActivePlayer().marker}`);
                        console.log(`Location selected: Row ${e.target.getAttribute("data-row")}, Col ${e.target.getAttribute("data-col")}`);
                        console.log(gameBoard.board); // this is just checking the old board array from the console version

                        // toying with pushing the activePlayer.marker (still the last turn played at this point) to gameBoard.board
                        gameBoard.board[e.target.getAttribute("data-row")].splice(e.target.getAttribute("data-col"),1,game.getActivePlayer().marker);

                        //checking if there is a winner after the gameBoard has been updated before the activePlayer is swapped
                        game.checkWinner();
                        game.checkTie();
                        if (game.checkWinner() === true) {
                            gameMessage.classList = "win-message";
                            gameMessage.textContent = (`That's 3 in a row. ${game.getActivePlayer().name} wins!`);
                            messageContainer.appendChild(gameMessage);
                            boardClear();
                        } else if (game.checkTie() === true) {
                            gameMessage.classList = "tie-message";
                            gameMessage.textContent = (`Board's full! This one ends in a tie.`);
                            messageContainer.appendChild(gameMessage);
                        } else {
                            game.switchPlayerTurn();
                        }

                        // swapping player and validating activePlayer changed
                        // game.switchPlayerTurn(); // switching the active player to the next player
                        console.log(`Current active player: ${game.getActivePlayer().name}, playing with ${game.getActivePlayer().marker}`);

                    } else {
                        // if the gridSpace being selected isn't blank, nothing happens
                        e.preventDefault();
                    }
                });
            };
        };
    };
    drawBoard(gameBoard.board);
    // console.log(game.activePlayer);
    // console.log(`Active Player Marker: ${game.activePlayer.marker}`);


    // clearing the board button
    const boardClear = () => {
        // creating the button
        const clearButton = document.createElement("button");

        clearButton.classList = "clear-grid-button";
        clearButton.textContent = "Play another round";
        clearContainer.appendChild(clearButton);

        // the event listener to clear the board, relook at rock paper scissors for how this might work
        clearButton.addEventListener('click', (e) => {
            drawBoard(gameBoard.board);
        })
    }

    // full game reset


    const setTheme = () => {
        const body = document.body;
        const newTheme = body.className === "dark-mode" ? "" : "dark-mode";
        body.className = newTheme;
    }

    document.querySelector(".light-dark-mode").addEventListener('click', setTheme);

    // returns
    return { drawBoard, boardClear };
};

const display = displayController();