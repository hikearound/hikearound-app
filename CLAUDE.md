# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hikearound is a React Native iOS application for discovering and sharing local hiking trails. It uses Expo SDK 51 (React Native 0.74), Redux for state management, and integrates with Firebase, Google Maps, and Apple Sign-In.

iOS-only — no Android target. The native `ios/` project is committed (no need to run `expo prebuild` for routine work). See `README.md` for the full build/run guide.

## Essential Development Commands

```bash
npm install            # also applies patches/ via postinstall
npm run ios            # build + run dev client on simulator
npm start              # start Metro for an already-built dev client
npm run lint
npm run format
npm run format:check
```

## Architecture & Key Patterns

### State Management

Redux:

- **Actions** (`/actions/`): per-domain (Auth, Feed, Hike, Map, etc.)
- **Reducers** (`/reducers/`): per-domain
- **Store** (`/store/Store.js`): root store

### Navigation

React Navigation v6:

- **Tab Navigator** (`/navigators/TabNavigator.js`): Home, Map, Notifications, Profile
- **Stack Navigators** (`/stacks/`): one per tab
- **App Navigator** (`/navigators/AppNavigator.js`): root container

### Component Organization

- **Screens** (`/screens/`): full-page route components
- **Components** (`/components/`): reusable UI, grouped by feature (`modal/`, `map/`, `feed/`, etc.)
- **Icons** (`/icons/`): custom icon components

### Component Patterns

This codebase is a **mix of class and function components**. Most screens (`/screens/`) and stacks (`/stacks/`) are class components with `connect()` HOCs and lifecycle methods; smaller leaf components are increasingly function components. New components should generally be function components with hooks, but don't refactor a class component to a function component just because — it often regresses subtle ref/lifecycle behavior.

PropTypes are used throughout (no TypeScript). Default props live inline in the destructure for function components (`function Foo({ x = 5 })`) and on `Component.defaultProps = ...` for class components.

### Styling

- styled-components everywhere; theme via `@utils/Themes` HOC
- Dark mode supported via theme context
- Shared styles in `/styles/`

### API Integration

- Firebase (compat API) initialized in `/lib/Fire.js` from `app.config.js`
- Env vars read via `Constants.expoConfig.extra.*` (NOT `Constants.manifest`, which is deprecated)
- Service utilities in `/utils/` (User, Hike, Location, Notifications, etc.)
- Apple Sign-In is the only auth provider currently wired (`/components/auth/Apple.js`). Push notifications are stubbed — `getExpoPushTokenAsync` is not called because the build has no EAS projectId.

## Code Style

Prettier (`.prettierrc`) and ESLint (`.eslintrc.js`, Airbnb + Prettier). Pre-commit hook in `.githooks/pre-commit` enforces both plus `expo install --check`.

- 2-space indent, single quotes, semicolons, trailing commas (`es5`), `arrowParens: 'avoid'`, LF
- `react/require-default-props` is configured with `{ functions: 'defaultArguments' }` so the rule accepts inline default params on function components

### Import Aliases

Configured in `babel.config.js` and `.eslintrc.js`. `@actions`, `@components`, `@constants`, `@icons`, `@lib`, `@navigators`, `@providers`, `@reducers`, `@screens`, `@stacks`, `@store`, `@styles`, `@utils`.

## Native build / patches

- `ios/` is committed. Don't run `expo prebuild` unless you've changed `app.config.js`/`app.json` and need to regenerate.
- `patch-package` reapplies patches in `patches/` after every `npm install` via the `postinstall` script. Currently used to fix Xcode 26 / Swift 6 strictness in `expo-localization`, `expo-device`, and `expo-dev-menu`. If a new Expo native module fails to build, prefer patching it via `patch-package` over forking the package.

## Environment

`.env` in repo root, gitignored. Required keys:

- `FIREBASE_KEY`, `FIREBASE_MEASUREMENT_ID`
- `GOOGLE_PLACES_KEY`, `GOOGLE_GEO_KEY`
- `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`

Sentry and Facebook keys may exist in `.env` but are no longer read by the app.
