/* eslint-disable no-console */
// PROGRAM PLAN
// 1. Build game to be played fully in console (controller).
// - Gameboard()
// - GameController()
// 2. Build the ui to display the game state and allow the user to interact with the game (view).
//  - ScreenController()
//  - updateScreen()
//  - clickHandlerBoard()

// GAME FLOW
// 1. Render empty board
// 2. Prompt for player choice
// 3. Check validity of player choice
// 4. Update board
// 5. Check win condition
// 6. Render board / win

// *** MODULE *** //
const GameModule = (function Gameboard() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const players = [
    {
      name: 'Player 1',
      mark: 'X',
      active: true,
    },
    {
      name: 'Player 2',
      mark: 'O',
      active: false,
    },
  ];

  const resetBoard = () => {
    // board = ['', '', '', '', '', '', '', '', ''];
  };

  const getBoard = () => board;

  const getPlayers = () => players;

  const setBoardCell = (activePlayer, playerChoice) => {
    board[playerChoice] = activePlayer.mark;
  };

  return {
    resetBoard,
    getBoard,
    getPlayers,
    setBoardCell,
  };
}());

// *** VIEW *** //
const GameView = (function GameView() {
  const board = GameModule.getBoard();

  const assembleBoard = () => {
    const displayBoardArray = board
      .map((cell) => (!cell ? '|   ' : `| ${cell} `));
    displayBoardArray.push('|\n');
    displayBoardArray.splice(6, 0, '|\n');
    displayBoardArray.splice(3, 0, '|\n');
    const displayBoard = displayBoardArray.join('');
    return displayBoard;
  };

  const render = () => {
    const boardState = assembleBoard();
    console.log(boardState);
  };

  return { render };
}());

// *** CONTROLLER *** //
const GameController = (function GameController() {
  const board = GameModule.getBoard();
  const players = GameModule.getPlayers();

  const validatePlayerChoice = (playerChoice) => {
    if (playerChoice < 0 || playerChoice > 8) return false;
    return board[playerChoice] === '';
  };

  const getPlayerChoice = (activePlayer) => {
    let valid = false;
    let playerChoice;
    while (!valid) {
      // eslint-disable-next-line no-alert
      playerChoice = prompt(`${activePlayer.name}, select your cell (1–9).`) - 1;
      valid = validatePlayerChoice(playerChoice);
    }

    return playerChoice;
  };

  const changePlayer = () => {
    players.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.active = !item.active;
    });
  };

  const checkForWin = () => {
    let win = false;

    // Utility functions
    const allEqual = (arr, test) => arr.every((val) => val === test);
    const everyThird = (arr, col) => arr
      .filter((e, i) => i === col - 1 || i === col + 2 || i === col + 5);

    // Assemble Rows to check for win
    const rows = [];
    rows.push(board.slice(0, 3));
    rows.push(board.slice(3, 6));
    rows.push(board.slice(6));

    // Assemble Columns to check for win
    const cols = [];
    for (let i = 1; i <= 3; i += 1) {
      cols.push(everyThird(board, i));
    }

    rows.forEach((row) => {
      if (allEqual(row, 'X')) win = 'X wins!';
      if (allEqual(row, 'O')) win = 'O wins!';
    });

    cols.forEach((col) => {
      if (allEqual(col, 'X')) win = 'X wins!';
      if (allEqual(col, 'O')) win = 'O wins!';
    });

    return win;
  };

  const takePlayerTurn = () => {
    // Get active player
    const activePlayer = players.find((e) => e.active);

    const playerChoice = getPlayerChoice(activePlayer);

    // let valid = false;
    // let playerChoice;
    // while (!valid) {
    //   playerChoice = getPlayerChoice(activePlayer);
    //   valid = validatePlayerChoice(playerChoice);
    // }

    GameModule.setBoardCell(activePlayer, playerChoice);

    GameView.render();

    changePlayer();
  };

  return {
    getPlayerChoice,
    validatePlayerChoice,
    takePlayerTurn,
    checkForWin,
  };
}());

// *** INIT *** //
// eslint-disable-next-line no-unused-vars
function GameInit() {
  // DEV //
  GameModule.resetBoard();
  const board = GameModule.getBoard();
  console.log(board);
  // DEV //
  GameView.render();
  while (!GameController.checkForWin()) {
    GameController.takePlayerTurn();
  }
  console.log(GameController.checkForWin());
}

// *** JEST SETUP FOR TESTING *** //
// *** Requires npm install --save-dev jest ***///
// *** Add 'env: { jest: true }' to esling.config.mjs to get rid of no-undef errors in test files
function testJestConnection() {
  return 'Success!';
}

// If statement to guard for errors in browser (doesn't recognize module)
if (typeof module === 'object') {
  module.exports = {
    testJestConnection,
    GameModule,
    GameView,
    GameController,
  };
}
