const { getJestProjects } = require("@nrwl/jest");

module.exports = {
  projects: [
    ...getJestProjects(),
    "<rootDir>/libs/adapter",
    "<rootDir>/libs/core",
  ],
};
