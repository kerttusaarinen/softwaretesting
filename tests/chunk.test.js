
import chunk from '../src/chunk.js';
// Author: Anton Virtanen
// npm test -- --runInBand tests/chunk.test.js


//----- TESTS DEFINED IN PHASE 1
describe('chunk.js - Phase 1 planned tests (CH-01 to CH-07)', () => {
  const items = ['a', 'b', 'c'];

  test('CH-01: pagination with remainder', () => {
    expect(chunk([1, 2, 3, 4, 5], 2))
      .toEqual([[1, 2], [3, 4], [5]]);
  });

  test.each([
    ['size 1', 1, [['a'], ['b'], ['c']]],
    ['exact size', 3, [['a', 'b', 'c']]],
    ['oversized', 10, [['a', 'b', 'c']]],
  ])('CH-02: handles %s', (_, size, expected) => {
    expect(chunk(items, size)).toEqual(expected);
  });

  test.each([
    ['empty array', []],
    ['null', null],
    ['undefined', undefined],
  ])('CH-03: handles %s input', (_, input) => {
    expect(chunk(input, 2)).toEqual([]);
  });

  test.each([
    ['zero', 0],
    ['negative', -3],
    ['NaN', NaN],
    ['empty array', []],
    ['null', null],
  ])('CH-04: rejects %s size', (_, size) => {
    expect(chunk(items, size)).toEqual([]);
  });

  test.each([
    ['fractional size', 2.7, [['a', 'b'], ['c']]],
    ['Infinity', Infinity, [['a', 'b', 'c']]],
  ])('CH-05: handles %s', (_, size, expected) => {
    expect(chunk(items, size)).toEqual(expected);
  });

  test.each([
    ['numeric string', '2', [['a', 'b'], ['c']]],
    ['padded string', ' 2 ', [['a', 'b'], ['c']]],
    ['invalid string', 'abc', []],
  ])('CH-06: handles %s', (_, size, expected) => {
    expect(chunk(items, size)).toEqual(expected);
  });

  test.each([
    ['binary string', '0b010'],
    ['boxed number', new Number(2)],
  ])('CH-07: handles %s', (_, size) => {
    expect(chunk(items, size))
      .toEqual([['a', 'b'], ['c']]);
  });
});

//----- ADDITIONAL TESTS
describe('chunk.js - Additional tests', () => {
  test('defaults to size 1', () => {
    expect(chunk(['a', 'b', 'c']))
      .toEqual([['a'], ['b'], ['c']]);
  });

  test('preserves order and duplicates', () => {
    expect(chunk(['x', 'x', 'y', 'x'], 2))
      .toEqual([['x', 'x'], ['y', 'x']]);
  });

  test('does not mutate input', () => {
    const input = [1, 2, 3, 4, 5];
    const original = [...input];

    const output = chunk(input, 2);

    expect(input).toEqual(original);
    expect(output).not.toBe(input);
  });

  test('handles single element', () => {
    expect(chunk(['only'], 2)).toEqual([['only']]);
  });

  test('handles Symbol size safely', () => {
    expect(chunk(items, Symbol('size'))).toEqual([]);
  });

  test('creates dense chunks from sparse arrays', () => {
    const input = [1, , 3];
    const output = chunk(input, 2);

    expect(output).toEqual([[1, undefined], [3]]);
    expect(
      Object.prototype.hasOwnProperty.call(output[0], 1)
    ).toBe(true);
  });
});
