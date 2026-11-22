
import add from '../src/add.js';

describe('Smoke test - basic functionality', () => {
  test('add(2, 3) returns 5', () => {
    expect(add(2, 3)).toBe(5);
  });
});
