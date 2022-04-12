# connect-four-OO

## Make Game into a Class
* What instance variables will be needed? (aside from height, width, and board)
* Make a constructor which sets default values
* Move current functions onto class as methods (will need a little reworking)
* The constructor should take height and width as arguments (`new Game(6, 7)`)

## Small Improvements
* Add a button to start the game
    * Game will only start after it's been clicked
    * Clicking again will start a new game
* Add a property for when the game is over
    * Additional moves can be made once it's over
    * Boolean variable checked before game lets you make another move

## Make a Player Class
* Constructor should take a string for player's color (word or hex) and store as variable
* `Game` should keep track of `player` object, not the player number
* Set pieces to the correct color for the player
    * Remove CSS hardcoding
* Add form to HTML that lets you enter colors for players

## Spice It Up
* Make it so more than 2 players can go
* Add animations, better graphics for board and pieces
* Make a computer player that drops a piece in a random column
    * Implement a `ComputerPlayer` class