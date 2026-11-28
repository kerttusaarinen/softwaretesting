# softwaretesting


### Coveralls: [![Coverage Status](https://coveralls.io/repos/github/kerttusaarinen/softwaretesting/badge.svg?branch=main)](https://coveralls.io/github/kerttusaarinen/softwaretesting?branch=main)


### How to run tests locally  
We provide human made and AI made tests, both can be run individually and together. The intended use for coveralls is to use the combined results.  

| Command | Purpose |
| --- | --- |
| `npm test` | All tests |
| `npm run test:human` | Human tests |
| `npm run test:ai` | AI tests |
| `npm run test:human:coverage` | Human coverage |
| `npm run test:ai:coverage` | AI coverage |
| `npm run test:coverage` | Combined coverage |
| `npm test -- tests/chunk.human.test.js` | Individual test file |
