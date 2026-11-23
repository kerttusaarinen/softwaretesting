
import isEmpty from '../src/isEmpty.js';


// Emptiness != falsy.
describe('isEmpty.js - Basic values', () => {
  test.each([
    ['null', null],
    ['undefined', undefined],
    ['empty string', ''],
    ['empty array', []],
    ['empty object', {}],
    ['zero', 0],
    ['false', false],
  ])('returns true for %s', (_description, value) => {
    expect(isEmpty(value)).toBe(true);
  });

  test.each([
    ['non-empty string', 'product'],
    ['whitespace-only string', '   '],
    ['array containing zero', [0]],
    ['object containing a product ID', { id: 'product-001' }],
  ])('returns false for %s', (_description, value) => {
    expect(isEmpty(value)).toBe(false);
  });
});

describe('isEmpty.js - E-commerce-shaped data', () => {
  test('an object with falsy field values is not empty', () => {
    expect(isEmpty({
      quantity: 0,
      available: false,
      discount: null,
    })).toBe(false);
  });

  test('an object with an empty nested object is not empty', () => {
    expect(isEmpty({ productDetails: {} })).toBe(false);
  });
});

describe('isEmpty.js - Collections and array-like values', () => {
  test.each([
    ['empty Map', new Map(), true],
    ['non-empty Map', new Map([['product-001', 1]]), false],
    ['empty Set', new Set(), true],
    ['non-empty Set', new Set(['product-001']), false],
  ])('handles %s', (_description, value, expected) => {
    expect(isEmpty(value)).toBe(expected);
  });

  test('an empty typed array is empty', () => {
    expect(isEmpty(new Uint8Array(0))).toBe(true);
  });

  test('a typed array containing zero is not empty', () => {
    expect(isEmpty(new Uint8Array([0]))).toBe(false);
  });

  test('an empty Node.js Buffer is empty', () => {
    expect(isEmpty(Buffer.alloc(0))).toBe(true);
  });

  test('a non-empty Node.js Buffer is not empty', () => {
    expect(isEmpty(Buffer.from([0]))).toBe(false);
  });

  function getArguments(..._values) {
    return arguments;
  }

  test('an empty arguments object is empty', () => {
    expect(isEmpty(getArguments())).toBe(true);
  });

  test('an arguments object with one value is not empty', () => {
    expect(isEmpty(getArguments(0))).toBe(false);
  });

  test('a sparse array with a positive length is not empty', () => {
    expect(isEmpty(new Array(3))).toBe(false);
  });
});

describe('isEmpty.js - Object property rules', () => {
  test('ignores inherited properties when checking emptiness', () => {
    const product = Object.create({
      inheritedId: 'product-001',
    });

    expect(isEmpty(product)).toBe(true);
  });

  test('ignores non-enumerable own properties', () => {
    const product = {};

    Object.defineProperty(product, 'hiddenId', {
      value: 'product-001',
      enumerable: false,
    });

    expect(isEmpty(product)).toBe(true);
  });

  test('ignores symbol-keyed properties', () => {
    const product = {
      [Symbol('id')]: 'product-001',
    };

    expect(isEmpty(product)).toBe(true);
  });
});
