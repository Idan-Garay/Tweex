const path = require("path");

const createCommand =
  (command, isFile = true) =>
  (filenames) => {
    const cmdTemplate = `${command} ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(`${isFile ? " --file " : " "}`)}`;

    return cmdTemplate;
  };

// const buildEslintCommand = createCommand("next lint --file");

const formatCommand = createCommand("prettier --check --write");
const lintCommand = createCommand("eslint --fix", false);
// const testCommand = "vitest related --run";

module.exports = {
  "*.{js,jsx,ts,tsx}": [formatCommand, lintCommand],
  // "src/app/*.test.*": [testCommand],
};
