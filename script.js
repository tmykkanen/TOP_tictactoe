/* eslint-disable no-console */
// PROGRAM PLAN
// 1. Build game to be played fully in console (controller).
// - Gameboard()
// - GameController()
// 2. Build the ui to display the game state and allow the user to interact with the game (view).
//  - ScreenController()
//  - updateScreen()
//  - clickHandlerBoard()

// *** GAME FLOW *** //
// Init empty 3x3 board
// Print empty board
// Prompt for Player1 Choice
// - Process player 1 choice
// - Print updated board

// stores the state of the game
const Gameboard = (function Gameboard() {
  // 3x3 array of boxes
  const rows = 3;
  const columns = 3;

  // TODO: use a flat array

  const board = [];
  const initializeBoard = () => {
    for (let row = 0; row < rows; row += 1) {
      board[row] = [];
      for (let column = 0; column < columns; column += 1) {
        // board[row][column] = [`${row}:${column}`];
        board[row][column] = '';
      }
    }
    console.log(board);
    printBoard();
  };

  // *** TEMP BOARD FOR DEVELOPMENT *** //
  // let board = [['X', 'O', ''], ['X', '', 'O'], ['', 'X', 'O']];

  // Gameboard() methods
  const getBoard = () => board;

  const printBoard = () => {
    let displayBoard = '';

    for (let row = 0; row < board.length; row += 1) {
      // start of row
      displayBoard += '|';
      for (let column = 0; column < columns; column += 1) {
        if (!board[row][column]) displayBoard += ' ';
        displayBoard += ` ${board[row][column]} |`;
      }
      displayBoard += '\n';
    }

    console.log(displayBoard);
  };

  const setBoardCell = (cord1, cord2, mark) => {
    console.log('Mark Cell success!');
    board[cord1][cord2] = mark;
    printBoard();
  };

  initializeBoard();

  return {
    getBoard,
    setBoardCell,
    printBoard,
    // getEmptyCells,
  };
}());

const GameController = (function GameController() {
  const placeMark = (cord1, cord2, mark) => {
    const board = Gameboard.getBoard();
    if (!board[cord1][cord2]) {
      Gameboard.setBoardCell(cord1, cord2, mark);
    } else {
      console.log('Opps!!');
    }
  };

  const checkForWinner = () => {
    // Check for column of all X or all O (use for)?
    const board = Gameboard.getBoard();

    // check for a row of all X or all O (use filter?)
    for (let row = 0; row < board.length; row += 1) {
      if (!board[row].includes('') && !board[row].includes('O')) console.log('X wins');
      if (!board[row].includes('') && !board[row].includes('X')) console.log('O wins');
      console.log(board[row]);
    }
    // try Array.prototype.every(); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

  };

  return { placeMark, checkForWinner };
}());

// *** JEST SETUP FOR TESTING *** //
// *** Requires npm install --save-dev jest ***///
// *** Add 'env: { jest: true }' to esling.config.mjs to get rid of no-undef errors in test files
function testJestConnection() {
  return 'Success!';
}

// If statement to guard for errors in browser (doesn't recognize module)
if (typeof module === 'object') {
  module.exports = { testJestConnection };
}
