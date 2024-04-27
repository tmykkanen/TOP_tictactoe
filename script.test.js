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

});
