const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// next/jest 는 node_modules 변환을 막는다. unified 계열은 ESM 전용이라 변환 대상으로 푼다.
// 새 ESM 패키지가 늘어 SyntaxError: Unexpected token 'export' 가 나면 이 목록에 더한다.
const esm = [
  'unified', 'bail', 'trough', 'vfile.*', 'unist.*', 'mdast.*', 'micromark.*', 'remark.*',
  'decode-named-character-reference', 'character-entities.*', 'is-plain-obj', 'devlop', 'fault', 'get-east-asian-width', 'unicode-.*',
  'ccount', 'markdown-table', 'zwitch', 'longest-streak', 'parse-entities', 'escape-string-regexp',
].join('|');

module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  config.transformIgnorePatterns = [`/node_modules/(?!(\\.pnpm|${esm})(/|@))`, '^.+\\.module\\.(css|sass|scss)$'];
  return config;
};
