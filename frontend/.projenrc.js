const { web } = require('projen');
const project = new web.NextJsTypeScriptProject({
  authorEmail: 'diamonddewan05@gmail.com',
  authorName: 'Diamond Dewan',
  defaultReleaseBranch: 'main',
  eslint: true,
  github: false,
  jest: true,
  name: 'spartan',
  projenrcTs: false,
  sampleCode: true,
  tailwind: false,
  vscode: true,
  scripts: {
    postbuild: 'next-sitemap',
  },
  deps: [
    '@mui/material@5.5.1',
    '@emotion/react',
    '@emotion/styled',
    '@mui/icons-material@5.2.4',
  ] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    'next-sitemap',
    'prettier',
    'eslint-config-next',
    'eslint-config-prettier',
  ] /* Build dependencies for this module. */,
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
  eslintOptions: {
    rules: {
      ['quote-props']: ['error', 'as-needed'],
    },
    extends: ['plugin:react/recommended', 'google', 'prettier', 'next'],
  },
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
      noImplicitAny: false,
      noImplicitReturns: false,
    },
  },
});

project.synth();
