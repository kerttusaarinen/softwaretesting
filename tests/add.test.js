
import add from '../src/add.js';


//----- TESTS DEFINED IN PHASE 1
describe('add.js - Phase 1 planned tests (AD-01 to AD-06)', () => {
  test('AD-01: adds prices represented as integer cents', () => {
    expect(add(1999, 500)).toBe(2499);
  });

  test.each([
    ['positive and negative', 5, -5, 0],
    ['two negative numbers', -5, -5, -10],
  ])('AD-02: handles %s', (_, a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  test('AD-03: preserves JavaScript floating-point behavior', () => {
    const result = add(0.1, 0.2);

    expect(result).toBe(0.1 + 0.2);
    expect(result).toBeCloseTo(0.3, 10);
  });

  test('AD-04: concatenates string operands', () => {
    expect(add('5', '5')).toBe('55');
  });

  test.each([
    ['second operand', 5, undefined],
    ['first operand', undefined, 5],
  ])('AD-05: handles missing %s', (_, a, b) => {
    expect(add(a, b)).toBe(5);
  });

  test('AD-06: null behaves as numeric zero (revised from Phase 1)', () => {
    expect(add(null, 5)).toBe(5);
  });

  test('AD-06: propagates NaN from first operand', () => {
    expect(Number.isNaN(add(NaN, 5))).toBe(true);
  });
});

//----- ADDITIONAL TESTS
describe('add.js - Additional useful behaviors', () => {
  test('returns zero when adding two zeros', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('handles zero as first operand', () => {
    expect(add(0, 7)).toBe(7);
  });

  test('handles zero as second operand', () => {
    expect(add(7, 0)).toBe(7);
  });

  test('adds decimal amounts resulting in a whole number', () => {
    expect(add(1.25, 2.75)).toBe(4);
  });

  test('adds negative decimal amounts', () => {
    expect(add(-1.5, 0.25)).toBe(-1.25);
  });

  test('handles large integers within safe integer range', () => {
    expect(add(Number.MAX_SAFE_INTEGER - 1, 1))
      .toBe(Number.MAX_SAFE_INTEGER);
  });

  test('returns zero when both operands are missing', () => {
    expect(add(undefined, undefined)).toBe(0);
  });

  test('concatenates when first operand is a string', () => {
    expect(add('5', 5)).toBe('55');
  });

  test('concatenates when second operand is a string', () => {
    expect(add(5, '5')).toBe('55');
  });

  test('handles positive Infinity', () => {
    expect(add(Infinity, 5)).toBe(Infinity);
  });

  test('returns NaN when adding opposite infinities', () => {
    expect(Number.isNaN(add(Infinity, -Infinity))).toBe(true);
  });

  test('propagates NaN from second operand', () => {
    expect(Number.isNaN(add(5, NaN))).toBe(true);
  });
});
