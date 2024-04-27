/* eslint-disable no-console */

// GAME FLOW
// 1. Render empty board
// 2. Prompt for player choice
// 3. Check validity of player choice
// 4. Update board
// 5. Check win condition
// 6. Render board / win

// *** MODULE *** //

const GameModule = (function GameModule() {
  const board = ['', '', '', '', '', '', '', '', ''];

  const players = [
    {
      name: 'Player 1',
      mark: 'X',
      active: true,
      winner: false,
    },
    {
      name: 'Player 2',
      mark: 'O',
      active: false,
      winner: false,
    },
  ];

  const resetGame = () => {
    board.splice(0, 9);
    board.push('', '', '', '', '', '', '', '', '');
    players[0].active = true;
    players[1].active = false;
  };

  const getBoard = () => board;

  const getPlayers = () => players;

  const setBoardCell = (activePlayer, playerChoice) => {
    board[playerChoice] = activePlayer.mark;
  };

  return {
    resetGame,
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
  let winMsg = '';

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
    let gameOver = false;

    if (!board.includes('')) {
      winMsg = 'Tie!';
      gameOver = true;
      return gameOver;
    }

    const groupingsToCheck = [];

    // Rows
    groupingsToCheck.push(
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
    );
    // Columns
    groupingsToCheck.push(
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
    );
    // Diagonals
    groupingsToCheck.push(
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    );

    // Utility test func
    const allEqual = (arr, test) => arr.every((val) => val === test);

    groupingsToCheck.forEach((row) => {
      if (allEqual(row, 'X')) {
        gameOver = true;
        winMsg = 'X wins!';
      }
      if (allEqual(row, 'O')) {
        gameOver = true;
        winMsg = 'O wins!';
      }
    });

    return gameOver;
  };

  const takePlayerTurn = () => {
    // Get active player
    const activePlayer = players.find((e) => e.active);

    const playerChoice = getPlayerChoice(activePlayer);

    GameModule.setBoardCell(activePlayer, playerChoice);

    GameView.render();

    changePlayer();
  };

  const playGame = () => {
    GameModule.resetGame();
    GameView.render();
    while (!checkForWin()) {
      takePlayerTurn();
    }
    console.log(winMsg);
  };

  return { playGame };
}());

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
