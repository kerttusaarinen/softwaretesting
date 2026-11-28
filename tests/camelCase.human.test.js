
import camelCase from '../src/camelCase.js';
// Author: Anton Virtanen
// npm test -- --runInBand tests/camelCase.test.js

// Generic camel case cases

describe('camelCase.js - Common naming styles', () => {
  test.each([
    ['words separated by spaces', 'product name', 'productName'],
    ['already camel-cased text', 'productName', 'productName'],
    ['text beginning with a capital', 'ProductName', 'productName'],
    ['uppercase words', 'PRODUCT NAME', 'productName'],
    ['underscores', 'product_name', 'productName'],
    ['hyphens', 'product-name', 'productName'],
    ['more than two words', 'product shipping address', 'productShippingAddress'],
  ])('converts %s', (_description, input, expected) => {
    expect(camelCase(input)).toBe(expected);
  });
});

describe('camelCase.js - Separators and punctuation', () => {
  test.each([
    ['repeated and surrounding separators', '__PRODUCT__NAME__', 'productName'],
    ['extra spaces, tabs and a newline', ' \t product   name \n', 'productName'],
    ['periods and slashes', 'product.name/value', 'productNameValue'],
    ['straight apostrophe', "product's name", 'productsName'],
    ['curly apostrophe', 'product’s name', 'productsName'],
  ])('handles %s', (_description, input, expected) => {
    expect(camelCase(input)).toBe(expected);
  });
});

describe('camelCase.js - Product-related text and numbers', () => {
  test.each([
    ['product identifier with a name', 'product-001-name', 'product001Name'],
    ['number between words', 'product 12 count', 'product12Count'],
    ['leading zeros in a product identifier', 'product-0001', 'product0001'],
    ['number inside a mixed-case name', 'product2Name', 'product2Name'],
  ])('handles %s', (_description, input, expected) => {
    expect(camelCase(input)).toBe(expected);
  });
});

describe('camelCase.js - Empty and non-string inputs', () => {
  test('returns an empty string for empty input', () => {
    expect(camelCase('')).toBe('');
  });

  test('returns an empty string when there are no words', () => {
    expect(camelCase(' --__ ')).toBe('');
  });

  test('returns an empty string when no argument is supplied', () => {
    expect(camelCase()).toBe('');
  });

  test('handles null as empty input', () => {
    expect(camelCase(null)).toBe('');
  });

  test('converts a number to text', () => {
    expect(camelCase(123)).toBe('123');
  });

  test('converts an array of words to camel case', () => {
    const input = ['product', 'name'];

    expect(camelCase(input)).toBe('productName');
    expect(input).toEqual(['product', 'name']);
  });
});

describe('camelCase.js - Accented characters', () => {
  test.each([
    ['lowercase accented letter', 'café product', 'caféProduct'],
    ['uppercase accented letter', 'Ångström product', 'ångströmProduct'],
  ])('handles %s', (_description, input, expected) => {
    expect(camelCase(input)).toBe(expected);
  });
});

describe('camelCase.js - Investigation ignoring leading whitespace', () => {
  test.each([
    ['normal input', 'product name', 'productName'],
    ['empty input', '', ''],
    ['undefined input', undefined, ''],
    ['null input', null, ''],
  ])('handles %s', (_, input, expected) => {
    expect(camelCase(input).trimStart()).toBe(expected);
  });
});