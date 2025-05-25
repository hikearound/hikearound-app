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

3. Create a `.env` file in the root directory with the following variables:

```
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_SEARCH_KEY=your_algolia_search_key
FIREBASE_KEY=your_firebase_key
GOOGLE_PLACES_KEY=your_google_places_key
GOOGLE_GEO_KEY=your_google_geo_key
SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
FACEBOOK_APP_ID=your_facebook_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

## Development

1. Start the development server:

```bash
npx expo start
```

2. Run on iOS simulator:

```bash
npx expo run:ios
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact the development team or open an issue in the repository.
