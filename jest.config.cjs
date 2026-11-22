
module.exports = {
  transform: {},
  coverageProvider: 'v8',

  collectCoverageFrom: [
    'src/**/*.js',
    '!src/.internal/**'
  ],

  coveragePathIgnorePatterns: ['/\\.internal/'],

  coverageReporters: ['text', 'lcov']
};
