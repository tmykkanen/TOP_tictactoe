const {
  testJestConnection,
  GameModule,
  GameView,
  GameController,
} = require('./script');

// GAME FLOW
// 1. Render empty board
// 2. Prompt for player choice
// 3. Check validity of player choice
// 4. Update board
// 5. Check win condition
// 6. Render board / win

test('Testing Jest Connection', () => {
  expect(testJestConnection()).toBe('Success!');
});

describe('Testing for GameModule', () => {
  test('should ', () => {

  });
});

describe('Testing for GameView', () => {

});

describe('Testing of GameController', () => {
  test('No win', () => {
    let x = ['X', 'O', '', 'X', '', 'O', '', 'X', 'O'];
    expect(GameController.checkForWin(x)).toBeFalsy();
  });
  test('X wins on top row', () => {
    let x = ['X', 'X', 'X', 'X', '', 'O', '', 'X', 'O'];
    expect(GameController.checkForWin(x)).toBe('X wins!');
  });
  test('O wins on mid row', () => {
    let x = ['X', 'X', 'O', 'O', 'O', 'O', '', 'X', 'O'];
    expect(GameController.checkForWin(x)).toBe('O wins!');
  });
  test('X wins on column 1', () => {
    let x = ['X', 'O', '', 'X', '', 'O', 'X', 'X', 'O'];
    expect(GameController.checkForWin(x)).toBe('X wins!');
  });
  test('O wins on column 3', () => {
    let x = ['X', 'O', 'O', '', '', 'O', 'X', 'X', 'O'];
    expect(GameController.checkForWin(x)).toBe('O wins!');
  });
});
