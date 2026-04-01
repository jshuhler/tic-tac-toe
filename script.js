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
function gameController() { // removed `row,col,board` from parameters that weren't being used
    // player details
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let playerOneScore = 0;
    let playerTwoScore = 0;
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

    // getting activePlayer out of closure
    const getActivePlayer = () => activePlayer;

    // incrementing the score after a win
    const incrementScore = () => {
        if (activePlayer === players[0]) {
            playerOneScore++;
        } else {
            playerTwoScore++;
        };
    };

    // resetting score back to 0
    const resetScore = () => {
        playerOneScore = 0;
        playerTwoScore = 0;
    }

    // getting the scores out of closure, this lets me work with both scores separately
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
        // creating and selecting elements
        for (let i = 0; i < arr.length; i++) {
            const rowNum = arr[i];
            for (let j = 0; j < rowNum.length; j++) {
                const gridSpace = document.createElement('div');
                gridSpace.classList = "grid-space";
                gridSpace.setAttribute("data-row", [i]); // the 2nd part of the data attribute needs to be updated here. 
                gridSpace.setAttribute("data-col", [j]);
                gridContainer.appendChild(gridSpace);
            };
        };
    };

    // event listener for the gridSpace clicks
    gridContainer.addEventListener('click', (e) => {
        console.log(e.target.className);
        if (e.target.className === "grid-space") {
            if (game.checkWinner() === true) {
                return;
            } else {
                // testing
                console.log(`before: ${game.checkWinner()}`);
                
                    // need to add a check that the space is blank and there is not a current winner, then reset the current winner when the board is reset later
                if (e.target.textContent === "") {
                    e.target.textContent = game.getActivePlayer().marker;
                    // checking current values in console
                    console.log(`Last turn taken by: ${game.getActivePlayer().name}, playing with ${game.getActivePlayer().marker}`);
                    console.log(`Location selected: Row ${e.target.getAttribute("data-row")}, Col ${e.target.getAttribute("data-col")}`);
                    console.log(gameBoard.board); // this is just checking the old board array from the console version
                    
                    // pushing the playerMarker of the selected gridSpace to the gameBoard array
                    gameBoard.board[e.target.getAttribute("data-row")].splice(e.target.getAttribute("data-col"),1,game.getActivePlayer().marker);

                    // testing
                    console.log(`after: ${game.checkWinner()}`);
                    
                    // checking if there is a winner after the gameBoard has been updated before the activePlayer is swapped
                    if (game.checkWinner() === true) {
                        game.incrementScore();
                        updateScoreboard();
                        console.log(`Player 1: ${game.getPlayerOneScore()} // Player 2: ${game.getPlayerTwoScore()}`);
                        gameMessage.classList = "win-message";
                        gameMessage.textContent = (`${game.getActivePlayer().name} wins!`);
                        messageContainer.appendChild(gameMessage);
                        playRoundButton();                    
                        // below lets the player who just lost go first if they play another round
                        game.switchPlayerTurn();
                        return;
                    } else if (game.checkTie() === true) {
                        gameMessage.classList = "tie-message"; 
                        gameMessage.textContent = (`Board's full! This one ends in a tie.`);
                        messageContainer.appendChild(gameMessage);
                        console.log(`Player 1: ${game.getPlayerOneScore()} // Player 2: ${game.getPlayerTwoScore()}`);
                        playRoundButton();
                    } else {
                        game.switchPlayerTurn();

                        // testing if the names from the modal have been updated correctly
                        console.log(game.playerOne);
                        console.log(game.playerTwo);
                    }

                    // swapping player and validating activePlayer changed
                    console.log(`Current active player: ${game.getActivePlayer().name}, playing with ${game.getActivePlayer().marker}`);
                    console.log(`-----------------`);

                } else {
                    // if the gridSpace being selected isn't blank, nothing happens
                    return;
                };
            };
        } else {
            return;
        };
    });

    drawBoard(gameBoard.board);

    // creating a play new round button and event listener
    const playRoundButton = () => {

        clearButton.classList = "clear-grid-button";
        clearButton.textContent = "Play another round";
        clearContainer.appendChild(clearButton);

        // the event listener to clear the board
        clearButton.addEventListener('click', (e) => {
            clearBoard();
            gameMessage.remove();
            clearButton.remove();
        });
    };

    // clearing the board button
    const clearBoard = () => {        
        // clearing the gameBoard array
        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board[row].length; col++)
                // gameBoard.board[row].push(""); //change to push(col) to see col numbers in console
                gameBoard.board[row][col] = "";
        };

        // clearing the DOM gridSpaces
        const gridSpaceAll = document.querySelectorAll('.grid-space');
        gridSpaceAll.forEach(space => {
            space.textContent = "";
        });
        console.log("Play another round button was just clicked!");
        console.log(gameBoard.board);
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