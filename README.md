# Hikearound

Hikearound is a React Native iOS application that helps users discover, save, and share great local hikes. The app provides curated and personalized hiking recommendations with detailed information about trails, difficulty levels, and user reviews.

## Features

-   🗺️ Interactive map with trail locations and details
-   🔍 Advanced search functionality
-   📍 Location-based hike recommendations
-   ⭐ User reviews and ratings
-   💾 List creation of your favorite hikes
-   🔔 Push notifications for trail updates
-   🌙 Dark mode support
-   🌐 Multi-language support (English and Spanish)

## Prerequisites

-   Node.js (v16 or later)
-   npm or yarn
-   Xcode (for iOS development)
-   iOS Simulator or physical iOS device
-   Expo CLI

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/hikearound/hikearound-app.git
cd hikearound-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp env.tmp .env
```

Then fill in your environment variables in the `.env` file.

4. Set up pre-commit hooks for code quality:

```bash
npm run setup-hooks
```

This configures Git to run automatic checks before each commit, including:

-   Prettier formatting
-   ESLint code quality
-   Expo dependency compatibility

## Development

1. Start the development server:

```bash
npx expo start
```

2. Run on iOS simulator:

```bash
npx expo run:ios
```

## Code Quality

This project uses automated code quality checks:

### Pre-commit Hooks

-   **Prettier**: Ensures consistent code formatting
-   **ESLint**: Catches code quality issues and enforces coding standards
-   **Expo dependencies**: Verifies dependency compatibility

### Manual Commands

```bash
# Format code with Prettier
npm run format

# Check formatting without fixing
npm run format:check

# Run ESLint
npm run lint
```

### Bypassing Hooks

If you need to bypass pre-commit checks (not recommended):

```bash
git commit --no-verify
```

## Storybook

Hikearound uses Storybook for React Native component development and documentation. This allows us to develop and test components in isolation on iOS.

### Running Storybook

Run Storybook on iOS:

```bash
npm run storybook:ios
```

This will launch the Storybook interface in your iOS simulator or connected device, where you can:

-   Browse and test individual components
-   View different component states
-   Interact with component props using knobs
-   Test component callbacks using actions

### Creating Stories

Stories are located in the `stories` directory. Each story file should:

-   Be named with the `.stories.js` extension
-   Export a default object with component metadata
-   Include one or more stories that demonstrate different states of the component

Example story structure:

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import MyComponent from '../components/MyComponent';

storiesOf('MyComponent', module)
    .add('default', () => <MyComponent />)
    .add('with props', () => <MyComponent prop1='value' />);
```

## Project Structure

```
hikearound-app/
├── actions/        # Redux actions
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable React components
├── constants/      # App constants and configuration
├── icons/          # Custom icons
├── lib/            # Utility libraries
├── navigators/     # Navigation configuration
├── providers/      # Context providers
├── reducers/       # Redux reducers
├── screens/        # App screens
├── stacks/         # Navigation stacks
├── store/          # Redux store configuration
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Key Technologies

-   React Native
-   Expo
-   Redux for state management
-   React Navigation
-   Algolia for search
-   Firebase for backend services
-   Google Maps/Places API
-   Sentry for error tracking
-   i18next for internationalization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
