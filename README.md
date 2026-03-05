# Hikearound

[![CI](https://github.com/hikearound/hikearound-app/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/hikearound/hikearound-app/actions/workflows/ci.yml)
[![React Native](https://img.shields.io/badge/React_Native-0.71-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-48-000020?logo=expo&logoColor=white)](https://expo.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?logo=opensourceinitiative&logoColor=white)](LICENSE)

A React Native iOS app for discovering, saving, and sharing great local hikes.

## Features

-   Interactive map with trail locations and details
-   Advanced search with Algolia
-   Location-based hike recommendations
-   User reviews and ratings
-   List creation for favorite hikes
-   Push notifications for trail updates
-   Dark mode support
-   Multi-language support (English and Spanish)

## Prerequisites

-   Node.js (v18+)
-   Xcode (for iOS development)
-   Expo CLI

## Getting Started

```bash
# Clone and install
git clone https://github.com/hikearound/hikearound-app.git
cd hikearound-app
npm install

# Set up environment
cp env.tmp .env
# Fill in your API keys in .env

# Set up pre-commit hooks
npm run setup-hooks

# Start development
npx expo start
```

## Development

```bash
npx expo start       # Start dev server
npx expo run:ios     # Run on iOS simulator
npm run lint         # ESLint
npm run format:check # Prettier check
npm run format       # Prettier fix
npm test             # Run tests
```

## Tech Stack

-   **React Native** with Expo SDK
-   **Redux** for state management
-   **React Navigation** for routing
-   **Firebase** for backend services
-   **Algolia** for search
-   **Google Maps/Places** for map features
-   **Sentry** for error tracking
-   **i18next** for internationalization
-   **Storybook** for component development

## Project Structure

```text
hikearound-app/
├── actions/        # Redux actions
├── assets/         # Images, fonts, static assets
├── components/     # Reusable React components
├── constants/      # App constants and configuration
├── icons/          # Custom icon components
├── lib/            # Utility libraries
├── navigators/     # Navigation configuration
├── providers/      # Context providers
├── reducers/       # Redux reducers
├── screens/        # App screens
├── stacks/         # Navigation stacks
├── store/          # Redux store configuration
├── stories/        # Storybook stories
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Related

-   [hikearound-web](https://github.com/hikearound/hikearound-web) - Web client
-   [hikearound-cloud-functions](https://github.com/hikearound/hikearound-cloud-functions) - Cloud Functions backend
