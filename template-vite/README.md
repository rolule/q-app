# Vite template

This is a Vite template for React that includes the following setup:

- chakra-ui -> UI library
- react-query -> data fetching and caching
- i18next -> translations
- react-hook-form -> form handling
- zod -> data and form validation

It includes a testing framework, including:

- vitest -> unit tests
- React testing-library -> component tests
- Mock Service Worker (msw) -> mocks

Other features included:

- a bundle visualizer that generates statistic HTML files on each build in the `stats/` folder
- custom Vite plugin for `.env` replacement in `index.html`
- `eslint` and `prettier` for linting and formatting
- smart form and input component
- smart Link component
- basic Chakra-UI theme setup
- typesafe localization setup
- ErrorBoundary
- 404 page

## Setup

1. Install dependencies: `yarn`
2. Install node version using nvm: `nvm install`
3. Copy `.env.development` to `.env.local` and edit default configuration
4. Run dev server: `yarn dev` or `yarn start`

> Using `yarn` is required

## Other scripts

- Run unit tests: `yarn test`
- Generate coverage files using c8: `yarn coverage`
- Generate production build: `yarn build`
- View production build: `yarn preview`
- Linting with autofixes: `yarn lint`
- Format using prettier: `yarn format`
