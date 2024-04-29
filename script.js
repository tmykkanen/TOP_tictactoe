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
  const board = [];

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
    players[0].winner = false;
    players[1].active = false;
    players[1].winner = false;
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
  const { getBoard, getPlayers } = GameModule;
  const board = getBoard();
  const players = getPlayers();

  const boardContainer = document.querySelector('.board-container');
  const headerContainer = document.querySelector('.header-container');

  const renderHeader = (gameState) => {
    headerContainer.innerHTML = '';

    const h1 = document.createElement('h1');
    h1.classList.add();
    h1.textContent = 'TIC TAC TOE';
    headerContainer.appendChild(h1);

    if (gameState === 'before') {
      const elem = document.createElement('button');
      elem.type = 'button';
      elem.classList.add('center');
      elem.textContent = 'Begin Game';
      // eslint-disable-next-line no-use-before-define
      elem.addEventListener('click', () => GameController.playGame());
      headerContainer.appendChild(elem);
    }
    if (gameState === 'during') {
      const activePlayer = players.find((e) => e.active);
      const elem = document.createElement('h2');
      elem.classList.add('center');
      elem.textContent = `${activePlayer.name} (${activePlayer.mark}), your turn.`;
      headerContainer.appendChild(elem);
    }
    if (gameState === 'over') {
      let winMsg = 'Tie!';

      if (players[0].winner) {
        winMsg = 'Player 1 (X) wins!';
      } else if (players[1].winner) {
        winMsg = 'Player 2 (O) wins!';
      }

      const msg = document.createElement('h2');
      msg.classList.add('left-justify');
      msg.textContent = winMsg;
      headerContainer.appendChild(msg);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.classList.add('right-justify');
      btn.textContent = 'Play Again';
      // eslint-disable-next-line no-use-before-define
      btn.addEventListener('click', () => GameController.playGame());
      headerContainer.appendChild(btn);
    }
  };

  const render = (gameState) => {
    renderHeader(gameState);

    boardContainer.innerHTML = '';

    for (let cell = 0; cell < board.length; cell += 1) {
      const div = document.createElement('div');
      div.setAttribute('id', cell);
      div.classList.add('board-cell');
      div.textContent = board[cell];
      if (board[cell] === 'X') div.classList.add('X');
      if (board[cell] === 'O') div.classList.add('O');
      boardContainer.appendChild(div);
      if (gameState === 'during') {
        div.addEventListener('click', (e) => GameController.takePlayerTurn(e));
        div.addEventListener('mouseover', () => {
          if (board[cell] === '') {
            div.classList.add('open-cell-hover');
            const activePlayer = players.find((player) => player.active);
            div.innerHTML = activePlayer.mark;
          }
        });
        div.addEventListener('mouseout', () => {
          div.innerHTML = board[cell];
          div.classList.remove('open-cell-hover');
        });
      }
    }
  };

  return { render };
}());

// *** CONTROLLER *** //
const GameController = (function GameController() {
  const {
    getBoard,
    getPlayers,
    resetGame,
    setBoardCell,
  } = GameModule;
  const { render } = GameView;

  const board = getBoard();
  const players = getPlayers();
  let gameState;

  const changePlayer = () => {
    players.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.active = !item.active;
    });
  };

  const checkForWin = () => {
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
        gameState = 'over';
        players[0].winner = true;
      }
      if (allEqual(row, 'O')) {
        gameState = 'over';
        players[1].winner = true;
      }
    });

    if (!board.includes('')) {
      gameState = 'over';
    }
  };

  const takePlayerTurn = (e) => {
    // Get active player
    const activePlayer = players.find((player) => player.active);
    const playerChoice = e.target.id;

    // Check for valid choice
    if (board[playerChoice] !== '') return;
    setBoardCell(activePlayer, playerChoice);

    checkForWin();
    changePlayer();
    render(gameState);
  };

  const playGame = () => {
    gameState = 'during';
    GameModule.resetGame();
    render(gameState);
  };

  const initGame = () => {
    gameState = 'before';
    resetGame();
    render(gameState);
  };

  return {
    playGame,
    initGame,
    takePlayerTurn,
  };
}());

GameController.initGame();

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
