# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hikearound is a React Native iOS application for discovering and sharing local hiking trails. It uses Expo SDK 51 (React Native 0.74), Redux for state management, and integrates with Firebase, Algolia, and Google Maps APIs.

## Essential Development Commands

```bash
# Install dependencies
npm install

# Start the dev client metro bundler
npm start

# Build & run on iOS simulator
npm run ios

# Lint
npm run lint

# Format
npm run format

# Format check
npm run format:check
```

## Architecture & Key Patterns

### State Management

The app uses Redux with the following structure:

- **Actions** (`/actions/`): Define Redux actions for each domain (Auth, Feed, Hike, Map, etc.)
- **Reducers** (`/reducers/`): Handle state updates for each domain
- **Store** (`/store/Store.js`): Configures the Redux store

### Navigation Structure

Uses React Navigation v6 with:

- **Tab Navigator** (`/navigators/TabNavigator.js`): Bottom tabs for Home, Map, Notifications, Profile
- **Stack Navigators** (`/stacks/`): Individual stacks for each tab
- **App Navigator** (`/navigators/AppNavigator.js`): Root navigation container

### Component Organization

- **Screens** (`/screens/`): Full-page components mapped to routes
- **Components** (`/components/`): Reusable UI components, organized by feature
  - Modal components in `/components/modal/`
  - Map-related components in `/components/map/`
  - Feed components in `/components/feed/`
- **Icons** (`/icons/`): Custom icon components

### Styling Approach

- Centralized style modules in `/styles/` for consistent theming
- Component-specific styles colocated with components
- Dark mode support via theme context and color constants

### API Integration Pattern

- Firebase configuration in `app.config.js` and `/lib/Fire.js`
- Environment variables loaded from `.env` file
- Service utilities in `/utils/` handle API calls for each domain

## Code Style & Conventions

Formatting is handled by Prettier (config in `.prettierrc`) and enforced in the pre-commit hook (`.githooks/pre-commit`):

- 2-space indentation
- Single quotes for strings and JSX attributes
- Semicolons required
- Trailing commas: `es5`
- Arrow parens: `avoid`
- LF line endings

ESLint extends Airbnb + Airbnb hooks + Prettier (`.eslintrc.js`).

### Import Aliases

Path aliases are configured in `babel.config.js` and `.eslintrc.js`:

- `@actions` → `./actions`
- `@components` → `./components`
- `@constants` → `./constants`
- `@screens` → `./screens`
- `@utils` → `./utils`
  (and others)

### Component Patterns

- Functional components with hooks
- PropTypes for type checking
- Memoization for performance-critical components
- Custom hooks for shared logic

## Environment Setup Requirements

Create a `.env` file in the project root with:

- `FIREBASE_KEY`: Firebase API key
- `GOOGLE_PLACES_KEY`: Google Places API key
- `GOOGLE_GEO_KEY`: Google Geocoding API key
- `ALGOLIA_APP_ID`: Algolia application ID
- `ALGOLIA_SEARCH_KEY`: Algolia search API key
- `FIREBASE_MEASUREMENT_ID`: (optional) Firebase web measurement ID
