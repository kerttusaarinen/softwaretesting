
import countBy from '../src/countBy.js';
// Author: Anton Virtanen
// npm test -- --runInBand tests/countBy.test.js

describe('countBy.js - Basic grouping', () => {
  test('counts products in repeated categories', () => {
    const products = [
      { category: 'fruit' },
      { category: 'vegetable' },
      { category: 'fruit' },
      { category: 'fruit' },
    ];

    expect(countBy(products, product => product.category))
      .toEqual({ fruit: 3, vegetable: 1 });
  });

  test('counts products when all belong to one category', () => {
    expect(countBy(['fruit', 'fruit', 'fruit'], value => value))
      .toEqual({ fruit: 3 });
  });

  test('counts each distinct category once', () => {
    expect(countBy(['fruit', 'vegetable', 'bakery'], value => value))
      .toEqual({ fruit: 1, vegetable: 1, bakery: 1 });
  });

  test('counts a single product', () => {
    expect(countBy([{ category: 'fruit' }], product => product.category))
      .toEqual({ fruit: 1 });
  });

  test('returns an empty object for an empty array', () => {
    expect(countBy([], value => value)).toEqual({});
  });

  test('returns an empty object for an empty object', () => {
    expect(countBy({}, value => value)).toEqual({});
  });
});

describe('countBy.js - Product-related grouping', () => {
  test('groups products by price range', () => {
    const products = [
      { name: 'product-001', price: 5 },
      { name: 'product-002', price: 20 },
      { name: 'product-003', price: 8 },
    ];

    expect(countBy(products, product =>
      product.price < 10 ? 'under10' : '10OrMore'
    )).toEqual({ under10: 2, '10OrMore': 1 });
  });

  test('groups products by availability, including false', () => {
    const products = [
      { available: true },
      { available: false },
      { available: true },
    ];

    expect(countBy(products, product => product.available))
      .toEqual({ true: 2, false: 1 });
  });

  test('counts values in an object collection', () => {
    const products = {
      'product-001': { category: 'fruit' },
      'product-002': { category: 'vegetable' },
      'product-003': { category: 'fruit' },
    };

    expect(countBy(products, product => product.category))
      .toEqual({ fruit: 2, vegetable: 1 });
  });

  test('groups missing or blank categories under a fallback', () => {
    const products = [
      { category: 'fruit' },
      { category: '' },
      { name: 'product-003' },
      { category: null },
    ];

    expect(countBy(products, product =>
      product.category || 'uncategorized'
    )).toEqual({ fruit: 1, uncategorized: 3 });
  });
});

describe('countBy.js - Group key behavior', () => {
  test('converts boolean group keys to object keys', () => {
    expect(countBy([true, false, true], value => value))
      .toEqual({ true: 2, false: 1 });
  });

  test('converts numeric group keys to object keys', () => {
    expect(countBy([1, 2, 1, 1], value => value))
      .toEqual({ '1': 3, '2': 1 });
  });

  test('groups a number and its string representation together', () => {
    expect(countBy([1, '1', 2], value => value))
      .toEqual({ '1': 2, '2': 1 });
  });

  test('treats differently capitalized categories as distinct', () => {
    expect(countBy(['Fruit', 'fruit', 'Fruit'], value => value))
      .toEqual({ Fruit: 2, fruit: 1 });
  });

  test('does not automatically trim category names', () => {
    expect(countBy(['fruit', 'fruit ', 'fruit'], value => value))
      .toEqual({ fruit: 2, 'fruit ': 1 });
  });

  test('converts undefined and null group keys to strings', () => {
    const products = [
      { category: undefined },
      { category: null },
    ];

    expect(countBy(products, product => product.category))
      .toEqual({ undefined: 1, null: 1 });
  });

  test('counts constructor as an own property', () => {
    const result = countBy(['constructor'], value => value);

    expect(Object.prototype.hasOwnProperty.call(result, 'constructor'))
      .toBe(true);
    expect(result.constructor).toBe(1);
  });

  test('counts __proto__ without changing the result prototype', () => {
    const result = countBy(['__proto__', '__proto__'], value => value);

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.prototype.hasOwnProperty.call(result, '__proto__'))
      .toBe(true);
    expect(result['__proto__']).toBe(2);
  });
});

describe('countBy.js - Iteration and input safety', () => {
  test('calls the grouping function once per product with only its value', () => {
    const products = [
      { category: 'fruit' },
      { category: 'vegetable' },
    ];
    const calls = [];

    countBy(products, (...args) => {
      calls.push(args);
      return args[0].category;
    });

    expect(calls).toEqual([[products[0]], [products[1]]]);
  });

  test('does not change the input array or its product objects', () => {
    const products = [
      { name: 'product-001', category: 'fruit' },
      { name: 'product-002', category: 'vegetable' },
    ];
    const original = products.map(product => ({ ...product }));

    countBy(products, product => product.category);

    expect(products).toEqual(original);
  });

  test('returns independent result objects for separate calls', () => {
    const first = countBy(['fruit'], value => value);
    const second = countBy(['vegetable'], value => value);

    expect(first).not.toBe(second);
    expect(first).toEqual({ fruit: 1 });
    expect(second).toEqual({ vegetable: 1 });
  });

  test('does not call the grouping function for an empty collection', () => {
    let callCount = 0;

    const result = countBy([], value => {
      callCount += 1;
      return value;
    });

    expect(result).toEqual({});
    expect(callCount).toBe(0);
  });
});
