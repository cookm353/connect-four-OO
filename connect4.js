/** Connect Four
 *
 * Players alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const startBttn = document.querySelector("#startBttn")
const submitBttn = document.querySelector("#submitBttn")
const newGameForm = document.querySelector("#newGameForm")

let currPlayerIndex= 0

class Game {
  constructor(width, height, players) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.players = players;

    this.makeBoard()
    this.makeHtmlBoard()
  }

  /** makeBoard: create in-JS board structure 
   * board = array of rows, each row is array of cells (board[y][x])
  */
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const htmlBoard = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    this.handleGameClick = this.handleClick.bind(this);
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleGameClick);
  
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    htmlBoard.append(top);
  
    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      htmlBoard.append(row);
    }
  }
  
  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  
  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayerIndex}`);
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.players[currPlayerIndex].color
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
  /** endGame: announce game end */
  endGame(msg) {
    alert(msg);
  }
  
  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    let player = this.players[currPlayerIndex]
    
    // get x from ID of clicked cell
    const x = +evt.target.id;
    
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    player.name ? this.board[y][x] = player.name : this.board[y][x] = `Player ${currPlayerIndex+1}`
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      // startBttn.removeEventListener("click");
      const top = document.querySelector('#column-top');
      top.removeEventListener("click", this.handleGameClick);
      console.log(`${player.name} won`)
      return this.endGame(`Player ${player.name} won!`);
    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    // switch players
    currPlayerIndex = currPlayerIndex === 0 ? 1 : 0;
  }
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    const _win = cells => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer      
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.players[currPlayerIndex].name
      );
    }
    const winCheck =_win.bind(this)
    /*
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer      
      console.log(currPlayer)  
      return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === currPlayer
        );
    }
  */
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        // if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        if (winCheck(horiz) || winCheck(vert) || winCheck(diagDR) || winCheck(diagDL)) {
          return true;
        }
      }
    }
  }
}


class Player {
  constructor(color, name) {
    this.color = color;
    this.name = name;
  }
}

function makePlayerInfoFields(numPlayers) {
  for (let i = 1; i <= numPlayers; i++) {
    // Create needed elements
    const newFieldset = document.createElement("fieldset");
    const newLegend = document.createElement("legend");
    const playerNameInput = document.createElement("input");
    const playerNameLabel = document.createElement("label");
    const playerColorInput = document.createElement("input");
    const playerColorLabel = document.createElement("label");
    const br = document.createElement("br");
    newLegend.innerText = `Player ${i}`;
    newFieldset.className = "playerFieldset";

    // Make name input
    playerNameInput.setAttribute("type", "text");
    playerNameInput.setAttribute("name", `player${i}Name`);
    playerNameInput.setAttribute("id", `player${i}Name`);
    playerNameInput.setAttribute("placeholder", "Name");
    playerNameInput.className = "playerName"
    playerNameLabel.setAttribute("for", `player${i}Name`);
    playerNameLabel.innerText = "Name: ";

    // Make color input
    playerColorInput.setAttribute("type", "color");
    playerColorInput.setAttribute("name", `player${i}Color`);
    playerColorInput.setAttribute("id", `player${i}Color`);
    playerColorInput.className = "playerColor"
    playerColorLabel.setAttribute("for", `player${i}Color`);
    playerColorLabel.innerText = "Color: ";
    if (i % 2 === 0) playerColorInput.value = "#FFFFFF";
      

    // Add to fieldset
    newFieldset.append(playerNameLabel, playerNameInput, 
      br, playerColorLabel, playerColorInput)
    newGameForm.append(newFieldset)
  }
}

// Display form for starting new game
startBttn.addEventListener("click", (e) => {
  e.preventDefault();
  newGameForm.style.display = "block";
  
  const numPlayersInput = document.querySelector("#numPlayers")
  
  makePlayerInfoFields(numPlayersInput.value);
  newGameForm.append(submitBttn)
})


// Update number of player fieldsets
/*
const numPlayersInput = document.querySelector("#numPlayers")
numPlayersInput.addEventListener("onchange", () => {
  const submitBttn = document.querySelector("#submitBttn");
  const numPlayers = numPlayersInput.value;
  const playerFieldsets = document.querySelectorAll(".playerFieldset");

  for (let playerFieldset of playerFieldsets) {
    newGameForm.remove(playerFieldset);
  }
  newGameForm.remove(submitBttn);

  makePlayerInfoFields(numPlayers);
  console.log(numPlayers)
  newGameForm.append(submitBttn);
})
*/


// Submitting info to start a new game
submitBttn.addEventListener("click", (e) => {
  e.preventDefault();

  const width = document.querySelector("#widthField").value;
  const height = document.querySelector("#heightField").value;
  const numPlayers = document.querySelector("#numPlayers").value;
  const pNames = document.querySelectorAll(".playerName");
  const pColors = document.querySelectorAll(".playerColor");
  const playerFieldsets = document.querySelectorAll(".playerFieldset")
  const players = [];

  for (let i = 0; i < numPlayers; i ++) {
    let player = new Player(pColors[i].value, pNames[i].value);
    players.push(player);
  }

  const game = new Game(width, height, players);
  newGameForm.style.display = "none";
  for (let fieldset of playerFieldsets) {
    fieldset.remove();
  }

  console.log(game)
})