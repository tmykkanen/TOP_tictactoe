const { testJestConnection } = require('./script');

test('Testing Jest Connection', () => {
  expect(testJestConnection()).toBe('Success!');
});

