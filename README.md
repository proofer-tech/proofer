# 프루퍼 (Proofer) Monorepo

"진짜" 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션

## Features

- www: 랜딩 페이지
- team: 팀 페이지
- app: 프루퍼 인사이트

## Stacks

- [Mantine](https://mantine.dev)
- [Next.js](https://nextjs.org/)
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `prettier:write` – formats all files with Prettier


## Rules

### NEXT.JS
- `Using App Router`
### layers
