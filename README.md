# Tic-Tac-Toe
Creating a tic-tac-toe game for [The Odin Project's](https://www.theodinproject.com/about) JavaScript course.

## Tools Used

# working notes
## gameboard
1 | 2 | 3 
---------
4 | 5 | 6
---------
7 | 8 | 9

## what i'll need
### console only version

- gameController
    - print the game board
    - place a marker (each player one at a time, alternating)
    - check for a winner (after each placement)


I'll just number out a rough list. 
1. I would need to make a grid.
2. I would need to figure out the players
3. Player 1 would go first - making an X
4. Player 2 would go second - making an O
5. Back and forth until someone either gets 3 in a row or the game is tied.
6. Then I'd need a new grid, repeat, etc etc.So I know what each of those is roughly in code (not how to code it, but what it needs to do), but I have NO CLUE how that happens just in a console with no inputs.

That's a perfect breakdown. And your instinct is right — without user input, how do you "play" a move in the console?
You just call a function manually and pass in the information. Like:
playTurn(player1, 0, 0) — player 1 plays at row 0, column 0.
Then you call it again for player 2, and so on. You're essentially simulating gameplay by calling functions yourself.
Does that help you picture it a bit better?

and

https://discord.com/channels/505093832157691914/690590001486102589/1477759150955040810

### testing
game.playTurn(game.playerOne,0,0);
game.playTurn(game.playerOne,0,2);
game.playTurn(game.playerOne,1,0);
game.playTurn(game.playerOne,2,2);
game.playTurn(game.playerOne,2,1);
game.playTurn(game.playerTwo,0,1);
game.playTurn(game.playerTwo,1,1);
game.playTurn(game.playerTwo,1,2);
game.playTurn(game.playerTwo,2,0);