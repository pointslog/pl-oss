const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/adapter',
    '<rootDir>/libs/bitpay',
    '<rootDir>/libs/core',
    '<rootDir>/libs/event-store',
    '<rootDir>/libs/mongodb',
    '<rootDir>/libs/stripe',
  ],
};
