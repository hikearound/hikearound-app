# Expo SDK 49 Upgrade Guide

## Overview

This document outlines the changes made to upgrade from Expo SDK 48 to Expo SDK 49.

## Changes Made

### 1. Package.json Updates

-   **Expo SDK**: Updated from `~48.0.0` to `~49.0.0`
-   **React Native**: Updated from `0.71.14` to `0.72.10`
-   **@expo/metro-config**: Updated from `^0.4.0` to `^9.5.0`
-   **babel-preset-expo**: Updated from `^9.0.2` to `^9.5.0`
-   **jest-expo**: Updated from `^41.0.0` to `^49.0.0`

#### Expo Packages Updated:

-   expo-apple-authentication: `~6.0.1` → `~6.1.0`
-   expo-asset: `~8.9.1` → `~8.10.0`
-   expo-blur: `~12.2.2` → `~12.4.0`
-   expo-constants: `~14.2.1` → `~14.4.0`
-   expo-crypto: `~12.2.1` → `~12.4.0`
-   expo-device: `~5.2.1` → `~5.4.0`
-   expo-file-system: `~15.2.2` → `~15.4.0`
-   expo-haptics: `~12.2.1` → `~12.4.0`
-   expo-image-manipulator: `~11.1.1` → `~11.3.0`
-   expo-image-picker: `~14.1.1` → `~14.3.0`
-   expo-linear-gradient: `~12.1.2` → `~12.3.0`
-   expo-linking: `~4.0.1` → `~5.0.0`
-   expo-localization: `~14.1.1` → `~14.3.0`
-   expo-location: `~15.1.1` → `~16.1.0`
-   expo-modules-core: `~1.2.7` → `~1.5.0`
-   expo-notifications: `~0.18.1` → `~0.20.0`
-   expo-permissions: `~14.1.1` → `~14.2.0`
-   expo-splash-screen: `~0.18.2` → `~0.20.0`
-   expo-status-bar: `~1.4.0` → `~1.6.0`
-   expo-updates: `~0.16.4` → `~0.18.0`
-   expo-web-browser: `~12.1.1` → `~12.3.0`

#### React Native Packages Updated:

-   react-native-gesture-handler: `~2.9.0` → `~2.12.0`
-   react-native-maps: `1.3.2` → `1.7.1`
-   react-native-reanimated: `~2.14.4` → `~3.3.0`
-   react-native-safe-area-context: `4.5.0` → `4.6.3`
-   react-native-screens: `~3.20.0` → `~3.22.0`
-   react-native-svg: `13.4.0` → `13.9.0`
-   react-native-web: `^0.18.12` → `^0.19.6`

#### Other Dependencies:

-   @react-native-async-storage/async-storage: `1.17.11` → `1.18.2`
-   @react-native-masked-view/masked-view: `0.2.8` → `0.2.9`
-   sentry-expo: `~6.2.0` → `~7.1.0`

#### Bottom Sheet Migration:

-   **Removed**: `reanimated-bottom-sheet` (incompatible with Reanimated 3.x)
-   **Added**: `@gorhom/bottom-sheet` (modern, actively maintained alternative)

### 2. Metro Configuration

-   Updated metro.config.js to be compatible with SDK 49
-   Updated comment to reflect React Native 0.72 compatibility
-   **Note**: Custom metro.config.js was removed to resolve expo-doctor warnings

### 3. iOS Configuration

-   Updated Podfile to require iOS 13.0+ (required for React Native 0.72)
-   Explicitly configured as iOS-only project with `android: false`

### 4. Bottom Sheet Component Migration

Migrated from `reanimated-bottom-sheet` to `@gorhom/bottom-sheet`:

#### API Changes:

-   `snapTo(2)` → `snapToIndex(1)`
-   `snapTo(1)` → `snapToIndex(1)`
-   `renderContent` → children prop
-   `renderHeader` → `handleComponent`
-   `enabledInnerScrolling` → removed (not needed)
-   `onCloseEnd` → `onClose`

#### Components Updated:

-   `components/bottom_sheet/Graph.js`
-   `components/bottom_sheet/Hike.js`
-   `screens/MapScreen.js`
-   `components/map/button/Location.js`

#### Snap Points Configuration:

-   **Before**: 3 snap points (collapsed, expanded, collapsed)
-   **After**: 2 snap points (collapsed, expanded)
-   Index 0 = collapsed, Index 1 = expanded

### 5. Expo Doctor Validation

After resolving all critical issues, `expo-doctor` shows:

-   **14/16 checks passed** ✅
-   **2/16 checks failed** ⚠️ (both are informational warnings)

#### Resolved Issues:

-   ✅ Missing peer dependency: `expo-application`
-   ✅ Unnecessary packages: `expo-modules-core` and `@expo/metro-config`
-   ✅ App config schema validation errors
-   ✅ Metro config issues
-   ✅ **NEW**: App configuration structure issues causing runtime errors
-   ✅ **NEW**: Deprecated `Constants.manifest` usage updated to `Constants.expoConfig`

#### Remaining Warnings (Non-Critical):

1. **Android API Level Warning** (iOS-only project - can be ignored)

    - Issue: SDK 49 targets Android API level 33, but Google Play Store requires API level 34+ after August 31, 2024
    - Impact: **None** - This is an iOS-only project
    - Status: **Safe to ignore**

2. **Prebuild Configuration Warning** (Normal for native projects)

    - Issue: Native project folders exist with dynamic configuration
    - Impact: Some config properties won't sync unless you run prebuild
    - Status: **Normal** - Run `expo prebuild` when you need to sync changes

### 6. Runtime Error Fixes

#### Constants.manifest Deprecation

Updated all instances of the deprecated `Constants.manifest` to `Constants.expoConfig`:

**Files Updated:**

-   `App.js` - Storybook and Sentry configuration
-   `lib/Fire.js` - Firebase initialization
-   `constants/Search.js` - Algolia search configuration
-   `constants/lists/Settings.js` - App version display
-   `utils/Location.js` - Google Geocoding API key
-   `components/map/GooglePlacesSearch.js` - Google Places API key

**Change Made:**

```javascript
// Before (deprecated)
Constants.manifest.extra.sentry.dsn;

// After (SDK 49 compatible)
Constants.expoConfig.extra.sentry.dsn;
```

#### App Configuration Structure

Fixed app.config.js structure to properly merge with base configuration and ensure all properties are accessible at runtime.

#### Firebase Initialization Issues

Fixed Firebase initialization problems that were causing runtime errors:

**Issues Resolved:**

-   `Object is not a constructor` error
-   `Maximum call stack size exceeded` error
-   Mixing Firebase v8 compat and v9 modern APIs

**Changes Made:**

-   Removed problematic v9 auth imports that conflicted with compat mode
-   Simplified to use only Firebase compat mode consistently
-   Fixed initialization pattern to avoid recursion issues
-   Removed access to internal `app._delegate` property
-   **NEW**: Changed to lazy initialization pattern to prevent module-level recursion

**New Architecture:**

-   Firebase is initialized only when App.js mounts
-   Services are created after initialization and stored globally
-   Other modules access services through accessor functions
-   Prevents circular dependencies and recursion issues

**Files Updated:**

-   `lib/Fire.js` - Simplified Firebase initialization
-   `App.js` - Firebase initialization moved to componentDidMount
-   `lib/firebaseServices.js` - New service accessor file

## Next Steps

### 1. Install iOS Dependencies

```bash
cd ios
pod install
```

### 2. Clean and Rebuild

```bash
# Clean Expo cache
expo start --clear

# For iOS development
expo run:ios

# For web development
expo start --web
```

### 3. Test the Application

-   Test all major functionality
-   Check for any runtime errors
-   Verify that all Expo modules work correctly
-   **Important**: Test bottom sheet interactions thoroughly

## Breaking Changes to Watch For

### 1. React Native 0.72

-   iOS deployment target must be 13.0+
-   Some deprecated APIs may have been removed

### 2. Expo SDK 49

-   Some Expo modules may have API changes
-   Check the [Expo SDK 49 migration guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) for detailed changes

### 3. React Native Reanimated 3.x

-   Major version bump from 2.x to 3.x
-   May require code changes for animations
-   Check the [Reanimated 3 migration guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)

### 4. Bottom Sheet Migration

-   **Critical**: Bottom sheet API has changed significantly
-   `snapTo()` method replaced with `snapToIndex()`
-   Component structure changed from render props to children
-   Snap points reduced from 3 to 2

## Troubleshooting

### Common Issues:

1. **Metro bundler errors**: Clear cache with `expo start --clear`
2. **iOS build errors**: Run `cd ios && pod install` and clean build folder
3. **Reanimated errors**: Check for deprecated animation APIs
4. **Permission errors**: Verify all required permissions are properly configured
5. **Bottom sheet errors**: Check that all `snapTo()` calls have been updated to `snapToIndex()`

### If Issues Persist:

1. Check the [Expo SDK 49 release notes](https://docs.expo.dev/versions/v49.0.0/)
2. Review the [React Native 0.72 release notes](https://reactnative.dev/blog/2023/06/21/0.72-version-release)
3. Check for any specific module compatibility issues
4. Review [@gorhom/bottom-sheet documentation](https://gorhom.github.io/react-native-bottom-sheet/)

## Notes

-   This upgrade includes a major React Native version bump (0.71 → 0.72)
-   React Native Reanimated has a major version bump (2.x → 3.x)
-   **Critical**: Bottom sheet library has been completely replaced
-   Some deprecated packages may need to be replaced in future updates
-   Consider updating ESLint and other dev dependencies in a separate update
-   **Important**: Expo automatically corrected dependency versions to ensure SDK 49 compatibility
-   **iOS-Only Project**: Android API level warnings can be safely ignored
