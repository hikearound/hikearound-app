# Hikearound

[![CI](https://github.com/hikearound/hikearound-app/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/hikearound/hikearound-app/actions/workflows/ci.yml)
[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-51-000020?logo=expo&logoColor=white)](https://expo.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?logo=opensourceinitiative&logoColor=white)](LICENSE)

A React Native iOS app for discovering, saving, and sharing great local hikes.

## Features

- Interactive map with trail locations and details
- Location-based hike recommendations
- Trail elevation chart with synced position marker on the map
- User reviews and ratings
- Favorites list
- Dark mode support
- Multi-language support (English and Spanish)

## Stack

- React Native 0.74 + Expo SDK 51
- Redux for state management
- React Navigation v6
- Firebase (Firestore, Auth, Storage, Functions) via the v9 compat API
- Apple Sign-In (only auth provider currently wired)
- Google Maps / Places API
- styled-components, react-native-gifted-charts, @gorhom/bottom-sheet
- i18next for localization

## Prerequisites

- macOS (this is an iOS-only project — no Android target)
- Xcode (latest stable; the repo currently builds against Xcode 26 / iOS 26 SDK)
- Node.js v22 or later (see `.nvmrc` for the pinned version)
- CocoaPods (`sudo gem install cocoapods` or via Homebrew)
- Apple ID signed into the iOS Simulator (required for Apple Sign-In)

## First-time setup

1. Clone the repo and enter it:

   ```bash
   git clone https://github.com/hikearound/hikearound-app.git
   cd hikearound-app
   ```

2. Use the pinned Node version (optional but recommended):

   ```bash
   nvm use   # respects .nvmrc
   ```

3. Install JS dependencies (also applies `patches/` via `postinstall`):

   ```bash
   npm install
   ```

4. Create the `.env` file from the template and fill in your keys:

   ```bash
   cp .env.tmp .env
   ```

   Required keys:
   - `FIREBASE_KEY`, `FIREBASE_MEASUREMENT_ID`
   - `GOOGLE_PLACES_KEY`, `GOOGLE_GEO_KEY`
   - `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`

5. Wire up the pre-commit hooks (one-time):

   ```bash
   npm run setup-hooks
   ```

   The hook runs `lint-staged` (Prettier + ESLint on staged files only) plus `expo install --check` before each commit.

## Build and run on the iOS Simulator

The native `ios/` project is committed, so a routine build is straightforward:

```bash
npm run ios
```

This single command will:

1. Install/refresh CocoaPods inside `ios/` (the first run takes several minutes; later runs are mostly cached)
2. Build the dev client via `xcodebuild`
3. Boot the default iOS Simulator and install the app
4. Start the Metro bundler

When the dev launcher screen appears in the simulator, tap the row that shows your local Metro URL (`http://localhost:8081`) to load the JS bundle.

### Day-to-day development

After the first build, you usually don't need to rebuild the native app. Start Metro and open the already-installed dev client:

```bash
npm start
```

Reload after JS changes with **Cmd+R** in the simulator window. Open the dev menu with **Cmd+D** for debugging tools.

### When to do a fresh native build

Run `npm run ios` again whenever you:

- Add or remove a native module (anything in `node_modules/expo-*` or `react-native-*` with native code)
- Change `app.json` / `app.config.js` plugins or iOS config
- Pull changes that touch `ios/` or `Podfile`
- Bump Expo or React Native versions

If `app.config.js` / `app.json` changes are not reflected, regenerate the native project:

```bash
npx expo prebuild --platform ios --clean
```

This rewrites `ios/` from the JS-side config. Don't run it for routine JS-only work.

### Apple Sign-In in the simulator

The Landing screen requires Apple Sign-In. The simulator must be signed into iCloud (Settings → Sign in to your iPhone) using a real Apple ID before sign-in works.

## Code quality

```bash
# Format with Prettier
npm run format

# Check formatting without writing
npm run format:check

# Lint with ESLint (Airbnb + Prettier)
npm run lint
```

Pre-commit hooks (installed via `npm run setup-hooks`) run `lint-staged` plus `expo install --check`. `lint-staged` runs Prettier and ESLint **only on staged files**, which keeps commits fast even on a repo this size. Hook scripts live in `.githooks/`.

If a commit absolutely needs to bypass hooks, `git commit --no-verify` works — but the same checks run in CI, so it usually just defers the cleanup.

## Patching node_modules

This project uses [`patch-package`](https://github.com/ds300/patch-package) for small, targeted patches to dependency source. Patches in `patches/` are reapplied automatically after every `npm install` via the `postinstall` script.

Current patches address Xcode 26 / Swift 6 strictness in three Expo modules (`expo-localization`, `expo-device`, `expo-dev-menu`). To add a new patch:

```bash
# Edit node_modules/<pkg>/...
npx patch-package <pkg-name>
```

The new `.patch` file is written to `patches/`.

## Continuous integration

GitHub Actions runs on every push and PR to `main`/`master`/`develop`:

- **CI** (`.github/workflows/ci.yml`): Prettier check, ESLint, `expo install --check`, and `claude-code-lint` (validates CLAUDE.md).
- **CodeQL** (`.github/workflows/codeql.yml`): security and quality static analysis on JS/TS, also runs weekly.
- **Dependabot auto-merge** (`.github/workflows/dependabot-auto-merge.yml`): minor and patch dependency updates from Dependabot are auto-approved and merged once CI passes.

Dependabot itself is configured in `.github/dependabot.yml` to open monthly grouped npm and GitHub Actions update PRs.

## Project structure

```text
hikearound-app/
├── actions/        Redux actions
├── assets/         Images, fonts, static assets
├── components/     Reusable UI components (organized by feature)
├── constants/      App-wide constants and config
├── icons/          Custom icon components
├── ios/            Generated native iOS project (committed)
├── keys/           Firebase GoogleService-Info.plist (gitignored contents)
├── lib/            Core libraries (Firebase init, etc.)
├── navigators/     Navigation roots and tab navigator
├── patches/        patch-package patches applied via postinstall
├── providers/      React context providers
├── reducers/       Redux reducers
├── screens/        Full-page route components
├── stacks/         Per-tab stack navigators
├── store/          Redux store config
├── styles/         Shared styled-components and theme helpers
└── utils/          Service / helper modules (auth, location, hike, etc.)
```

## Troubleshooting

**`pod install` fails on Apple Silicon**
Try `cd ios && arch -x86_64 pod install` once. Subsequent runs usually work without it.

**`xcodebuild` fails with Swift exhaustiveness or `TARGET_OS_SIMULATOR` errors in an Expo native module**
This is an Xcode 26 / Swift 6 strictness mismatch. Patch the offending file in `node_modules/<pkg>/ios/` and run `npx patch-package <pkg>` to persist it.

**Dev client launches but stays on the launcher screen**
Metro isn't running, or it's bound to a different host. Run `npm start` in another terminal and tap the localhost URL on the launcher.

**App crashes on launch with a Firebase or Constants error**
Verify `.env` exists in the repo root and contains the required keys. The dev build reads them at startup via `expo-constants`.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
