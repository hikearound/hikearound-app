# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hikearound is a React Native iOS application for discovering and sharing local hiking trails. It uses Expo SDK 41, Redux for state management, and integrates with Firebase, Algolia, and Google Maps APIs.

## Essential Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run tests
npm test

# Run single test file
npm test -- [test-file-path]

# Run linter
npm run lint

# Run Storybook on iOS
npm run storybook:ios
```

## Architecture & Key Patterns

### State Management

The app uses Redux with the following structure:

-   **Actions** (`/actions/`): Define Redux actions for each domain (Auth, Feed, Hike, Map, etc.)
-   **Reducers** (`/reducers/`): Handle state updates for each domain
-   **Store** (`/store/Store.js`): Configures the Redux store

### Navigation Structure

Uses React Navigation v6 with:

-   **Tab Navigator** (`/navigators/TabNavigator.js`): Bottom tabs for Home, Map, Notifications, Profile
-   **Stack Navigators** (`/stacks/`): Individual stacks for each tab
-   **App Navigator** (`/navigators/AppNavigator.js`): Root navigation container

### Component Organization

-   **Screens** (`/screens/`): Full-page components mapped to routes
-   **Components** (`/components/`): Reusable UI components, organized by feature
    -   Modal components in `/components/modal/`
    -   Map-related components in `/components/map/`
    -   Feed components in `/components/feed/`
-   **Icons** (`/icons/`): Custom icon components

### Styling Approach

-   Centralized style modules in `/styles/` for consistent theming
-   Component-specific styles colocated with components
-   Dark mode support via theme context and color constants

### API Integration Pattern

-   Firebase configuration in `app.config.js` and `/lib/Fire.js`
-   Environment variables loaded from `.env` file
-   Service utilities in `/utils/` handle API calls for each domain

## Code Style & Conventions

### ESLint Configuration

-   Extends Airbnb style guide with React Native rules
-   4-space indentation
-   Single quotes for strings, JSX attributes
-   Semicolons required
-   Trailing commas in multiline structures

### Import Aliases

The project uses path aliases configured in `.eslintrc.js`:

-   `@actions` → `./actions`
-   `@components` → `./components`
-   `@constants` → `./constants`
-   `@screens` → `./screens`
-   `@utils` → `./utils`
    (and others)

### Component Patterns

-   Functional components with hooks
-   PropTypes for type checking
-   Memoization for performance-critical components
-   Custom hooks for shared logic

## Environment Setup Requirements

1. Create `.env` file from template: `cp env.tmp .env`
2. Required environment variables:
    - `FIREBASE_KEY`: Firebase API key
    - `GOOGLE_PLACES_KEY`: Google Places API key
    - `GOOGLE_GEO_KEY`: Google Geocoding API key
    - `ALGOLIA_APP_ID`: Algolia application ID
    - `ALGOLIA_SEARCH_KEY`: Algolia search API key
    - `SENTRY_DSN`: Sentry error tracking DSN
    - `FACEBOOK_APP_ID`: Facebook app ID

## Testing Approach

-   Jest with Expo preset for unit tests
-   Test files colocated with components in `__tests__` directories
-   Snapshot testing for component rendering
-   Mock Redux store for connected components

## Storybook Development

Stories are in `/stories/` directory. When creating new stories:

1. Name files with `.stories.js` extension
2. Use the existing story patterns and decorators in `/stories/utils/`
3. Run `npm run prestorybook` to update the story loader before running Storybook
