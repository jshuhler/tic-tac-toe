// ======= GAMEBOARD =======
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

// ======= PLAYER CREATION =======
const createPlayer = function makePlayer(name, marker) {

    return { name, marker };
}

// ======= GAME CONTROLLER =======
function gameController() { 
    // player details
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let playerOneScore = 0;
    let playerTwoScore = 0;
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];

    // playing a turn
    const playTurn = (player, row, col) => {
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

    const checkWinner = () => {
        // checking row winner
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][1] === gameBoard.board[i][2] && gameBoard.board[i][1] !== "") {
                return true;
            };
        };

        // checking col winner
        for (let j = 0; j < 3; j++) {
            if (gameBoard.board[0][j] === gameBoard.board[1][j] && gameBoard.board[1][j] === gameBoard.board[2][j] && gameBoard.board[1][j] !== "") {
                return true;
            };
        };

        // checking diagonal winner
        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][2] && gameBoard.board[1][1] !== "") {
            return true;
        } else if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][0] && gameBoard.board[1][1] !== "") {
            return true;
        };

        // otherwise...
        return false;
    };

    const checkTie = () => {
        return gameBoard.board.every((row) => row.every(cell => cell !== ""));
    }

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        };
    };

    const getActivePlayer = () => activePlayer;

    const incrementScore = () => {
        if (activePlayer === players[0]) {
            playerOneScore++;
        } else {
            playerTwoScore++;
        };
    };

    const resetScore = () => {
        playerOneScore = 0;
        playerTwoScore = 0;
    }

    const getPlayerOneScore = () => playerOneScore;
    const getPlayerTwoScore = () => playerTwoScore;

    return { 
        players, 
        playerOne, 
        playerTwo, 
        playerOneScore, 
        playerTwoScore, 
        playTurn, 
        activePlayer, 
        switchPlayerTurn, 
        getActivePlayer, 
        checkWinner, 
        checkTie, 
        incrementScore, 
        getPlayerOneScore, 
        getPlayerTwoScore,
        resetScore,
     };
};

// ======= DISPLAY CONTROLLER =======
function displayController() {
    const game = gameController();
    const messageContainer = document.querySelector('.message-container');
    const gridContainer = document.querySelector('.grid-container');
    const clearContainer = document.querySelector('.clear-container');
    const gameMessage = document.createElement("div");
    const clearButton = document.createElement("button");
    const playerOneName = document.getElementById("scoreboard-name1");
    const playerTwoName = document.getElementById("scoreboard-name2");
    let p1DisplayScore = document.getElementById("scoreboard-score1");
    let p2DisplayScore = document.getElementById("scoreboard-score2");
    const addPlayerNames = document.querySelector(".add-player-names");
    const dialog = document.querySelector("dialog"); //for the listener on the DOM to show the player name modal
    const submitNames = document.getElementById("add-player-names-submit");
    const closeNames = document.getElementById("close-player-names");
    
    // creating the grid spaces within `grid-container`
    const drawBoard = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const rowNum = arr[i];
            for (let j = 0; j < rowNum.length; j++) {
                const gridSpace = document.createElement('div');
                gridSpace.classList = "grid-space";
                gridSpace.setAttribute("data-row", [i]); 
                gridSpace.setAttribute("data-col", [j]);
                gridContainer.appendChild(gridSpace);
            };
        };
    };

    // event listener for the gridSpace clicks
    gridContainer.addEventListener('click', (e) => {
        if (e.target.className === "grid-space") {
            if (game.checkWinner() === true) {
                return;
            } else {
                if (e.target.textContent === "") {
                    e.target.textContent = game.getActivePlayer().marker;
                    // pushing the playerMarker of the selected gridSpace to the gameBoard array
                    gameBoard.board[e.target.getAttribute("data-row")].splice(e.target.getAttribute("data-col"),1,game.getActivePlayer().marker);
                    // checking if there is a winner after the gameBoard has been updated before the activePlayer is swapped
                    if (game.checkWinner() === true) {
                        game.incrementScore();
                        updateScoreboard();
                        gameMessage.classList = "win-message";
                        gameMessage.textContent = (`${game.getActivePlayer().name} wins!`);
                        messageContainer.appendChild(gameMessage);
                        playRoundButton();                    
                        // losing player starts the next round
                        game.switchPlayerTurn();
                        denoteActive();
                        return;
                    } else if (game.checkTie() === true) {
                        gameMessage.classList = "tie-message"; 
                        gameMessage.textContent = (`Board's full! This one ends in a tie.`);
                        messageContainer.appendChild(gameMessage);
                        console.log(`Player 1: ${game.getPlayerOneScore()} // Player 2: ${game.getPlayerTwoScore()}`);
                        playRoundButton();
                    } else {
                        game.switchPlayerTurn();
                        denoteActive();
                    };
                } else {
                    return;
                };
            };
        } else {
            return;
        };
    });

    drawBoard(gameBoard.board);

    const playRoundButton = () => {
        clearButton.classList = "clear-grid-button";
        clearButton.textContent = "Play another round";
        clearContainer.appendChild(clearButton);
        clearButton.addEventListener('click', (e) => {
            clearBoard();
            gameMessage.remove();
            clearButton.remove();
        });
    };

    const clearBoard = () => {        
        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board[row].length; col++)
                gameBoard.board[row][col] = "";
        };

        const gridSpaceAll = document.querySelectorAll('.grid-space');
        gridSpaceAll.forEach(space => {
            space.textContent = "";
        });
    };

    // displaying the player name modal on page load
    window.addEventListener('DOMContentLoaded',() => {
        dialog.showModal();
    });

    // submitting the player name modal
    submitNames.addEventListener('click', (e) => {
        if (document.getElementById('player-one').value === "") {
            playerOneName.textContent = "Player One";
        } else {
            playerOneName.textContent = document.getElementById('player-one').value;
        };
        if (document.getElementById('player-two').value === "") {
            playerTwoName.textContent = "Player Two";
        } else {
            playerTwoName.textContent = document.getElementById('player-two').value;
        }
        setPlayerNames();
        denoteActive();
        addPlayerNames.reset();
        dialog.close();
        e.preventDefault();
    });

    // updating the player names within the players array
    const setPlayerNames = () => {
        if (document.getElementById('player-one').value === "") {
            game.playerOne.name = "Player One";
        } else {
            game.playerOne.name = document.getElementById('player-one').value;
        };
        if (document.getElementById('player-two').value === "") {
            game.playerTwo.name = "Player Two";
        } else {
            game.playerTwo.name = document.getElementById('player-two').value;
        }; 
    };

    // closing the player name modal without submitting
    closeNames.addEventListener('click', (e) => {
        dialog.close();
        e.preventDefault();
    });

    // updating the scoreboard
    const updateScoreboard = () => {
        p1DisplayScore.textContent = game.getPlayerOneScore();
        p2DisplayScore.textContent = game.getPlayerTwoScore();
    };

    // underlinning the active player on the scoreboard
    const denoteActive = () => {
        if (game.getActivePlayer() === game.playerOne) {
            playerOneName.classList.add("active-player");
            playerTwoName.classList.remove("active-player");
        } else if (game.getActivePlayer() === game.playerTwo) {
            playerTwoName.classList.add("active-player");
            playerOneName.classList.remove("active-player");
        };
    };

    // full game reset
    const resetButton = document.querySelector(".reset-game-button");
    resetButton.addEventListener('click', () => {
        game.resetScore();
        updateScoreboard();
        if (game.getActivePlayer() === game.playerTwo) {
            game.switchPlayerTurn();
        };
        clearBoard();
        gameMessage.remove();
        clearButton.remove();
        dialog.showModal();
    })

    // light & dark mode
    const setTheme = () => {
        const body = document.body;
        const newTheme = body.className === "dark-mode" ? "" : "dark-mode";
        body.className = newTheme;
    };

    document.querySelector(".light-dark-mode").addEventListener('click', setTheme);

    // displayController returns
    return { drawBoard, clearBoard, playRoundButton };
};

const display = displayController();