# 프루퍼 (Proofer) Monorepo

프루퍼팀 통합 홈페이지

## Features

- www: 랜딩 페이지
- insight: 프루퍼 인사이트
- insight-demo: 프루퍼 인사이트 데모

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
  - 빌드를 확인할 때는 `npx next build`를 직접 부르지 말고 이 스크립트로 돌린다.
    `next build`를 그대로 부르면 셸이 물려받은 `__NEXT_PRIVATE_STANDALONE_CONFIG`가
    `next.config.mjs`를 통째로 대체해 버려서, 코드에 결함이 없는데도 빌드가 실패한다
    (자세한 사정은 `next.config.mjs` 위쪽 주석에 적어 두었다).
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
